/*
	专门存放和数据库相关的路由信息  接收ajax   form   图片上传
*/
const express = require("express")

const conn = require("./db");
// var models = require('./db.config')

var router = express.Router();

const mysql = require("mysql");

var $sql = require('./sqlMap')

// var conn = mysql.createConnection(models.mysql)

// conn.connect()
// 
/**
* @req request  请求对象
* @res response  响应对象
*/
var jsonWrite = function(res, ret) {
  if (typeof ret === 'undefined') {
    res.send('err')
  } else {
    console.log(ret)
    res.send(ret)
  }
}
//注册逻辑 
router.post('/register', (req, res) => {
	conn.getConnection(function(err,connection){
	if(err){
		res.redirect("")
		return;
	}
	  var sql = $sql.user.add
	  var params = req.body
	  console.log(params)
	  connection.query(sql, [params.username,params.account,params.password, 
	    params.email, params.phone,params.sex], function(err, result,fields) {
	    console.log(err)
	    if (err) {
	      console.log(params.username)
	    }
	    if (result) {
	      jsonWrite(res, result)
	      connection.release();
	    }
	  })
  })
})



// 登录逻辑
router.get("/login",(req,res)=>{
	conn.getConnection(function(err,connection){
		if(err){
			res.redirect("")
			return;
		}
		// 可以防止sql注入
		var sql = `select * from user `;

		var sqlParams = [req.body.username,req.body.password];
		connection.query(sql,function(err,rows){
			if(rows.length > 0){
				res.jsonp(rows);
			}else{
				res.send(false)
			}
		})
	})
});


/*router.post('/login', (req, res) => {
  var sql_name = $sql.user.select_name
  // var sql_password = $sql.user.select_password;
  var params = req.body
  var keywords = JSON.parse(Object.keys(params)[0])
  if (keywords.name) {
    sql_name += " where username ='" + keywords.name + "'"
    console.log(sql_name)
  }
  conn.query(sql_name, keywords.name, function(err, result) {
    if (err) {
      console.log(err)
    }
    // console.log(result);
    if (result[0] === undefined) {
      res.send('-1') // 查询不出username，data 返回-1
    } else {
      var resultArray = result[0]
      console.log(resultArray)
      console.log(keywords)
      if (resultArray.password === keywords.password) {
        jsonWrite(res, result)
      } else {
        res.send('0') // username
      }
    }
  })
})*/

/*
router.get("/logout",(req,res)=>{
	req.session.destroy(function(err) {
        if(err){
			res.redirect("/front/error");
			return;
		}
        res.redirect('/');
    });
});

router.post("/addRelease",(req,res)=>{
	conn.getConnection(function(err,connection){
		if(err){
			res.redirect("/front/error")
			return;
		}
		// 可以防止sql注入
		var sql = `insert into note (classfiy,title,content,date,click,reply,imgurl) values (?,?,?,?,?,?,?)`;
		// md5 shhi
		var sqlParams = [req.body.classfiy,req.body.title,req.body.content,new Date(),0,0,req.body.imgurl];
		connection.query(sql,sqlParams,function(err,rows){
			// console.log(rows.affectedRows >= 1)
			if(rows.affectedRows >= 1){
				res.send(true)
			}else{
				res.send(false)
			}
		})
	})
});
*/
module.exports = router;