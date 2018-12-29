// 加载数据库
const mysql = require("mysql");

// 加载数据库连接配置
const config = require("./db.config");


var pool  = mysql.createPool(config);

module.exports = pool;