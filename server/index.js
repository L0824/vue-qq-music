// 核心express
const express = require("express");
// 模板引擎
const ejs = require("ejs");
// 加载api模块
const api = require("./api");
// 加载数据库
const mysql = require("mysql");
// 加载处理post请求的中间件
const bodyParser = require('body-parser');

// 加载session所需的中间件
const cookieParser = require('cookie-parser');
const session = require('express-session');
// 将session保存到数据库的设计
const SessionStore = require('express-mysql-session');

const config = require("./db.config");

// 获取应用程序实例
var app = express();
/*
	设置html引擎
	第一个参数,模板引擎的名称；也就是要解析的模板的后缀名
	第二个参数：使用该模板引擎去解析后缀名为.html的文件
*/
/*app.engine('html', ejs.__express);
// 设置处理视图时所去查找的目录  第一个参数必须是views  第二个参数就是模板所在的位置
app.set("views","./views")
// 设置了视图引擎
app.set('view engine', 'html');
// 静态资源文件托管
// 任何以/public开头的路径访问，都告诉应用程序去__dirname + '/public'这个目录中去寻找
app.use("/public",express.static(__dirname + '/public'));*/

// 设置bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
sessionStore = new SessionStore({
    host     : 'localhost',
  	user     : 'root',
  	password : '123456',
  	database : 'music',
  	port 	 : '3306',
    schema: {
        tableName: 'session',
        columnNames: {
            session_id: 'id',
            expires: 'expires',
            data: 'data'
        }
    }
}, mysql.createConnection(config))

app.use(cookieParser()); 

app.use(session({
    key: "music",
    secret: "12345",
    cookie: {
        maxAge: 6 * 60 * 60 * 1000
    },
    store: sessionStore,
    rolling: true,
    resave: true,
    saveUninitialized: true  
}));
// 当路由是以/api开头的都回去执行router目录下api.js文件中的路由
app.use('/api',api);
// 设置当访问localhost:8080/

/*app.use(function(req,res,next){
	if(!req.session.user){
		if(req.url=="/login" || req.url=="/api/login" || req.url=="/" || req.url=="/register" || req.url=="/api/register"){
			next();
		}else{
			res.redirect('/login');  
		}
	}else{
		next();
	}
});*/


//允许跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
/*
app.all('*',function (req, res, next) {
     res.header("Access-Control-Allow-Origin", "*"); 
     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS'); //请求方式
     res.header("Access-Control-Allow-Headers", "X-Requested-With");
     res.header('Access-Control-Allow-Headers', 'Content-Type');
     next();
});*/
app.get("/",function(req,res){
	// 重定向到localhost:8080/api/这个路由
	res.redirect("/api");
});

// 开启一个监听服务器
app.listen("8080",function(){
	console.log("当前项目已启动，请访问localhost:8080")
});
