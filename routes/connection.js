/**
 * Created by Administrator on 2015/9/18.
 */
module.exports = function(app){
    var mysql      = require('mysql');
    var  connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '123456',
        database : 'xuhuaiyuan'
    });
    return connection;
};