/**
 * Created by Administrator on 2015/9/18.
 */
module.exports = function(app){
    var mysql      = require('mysql');
    var  connection = mysql.createConnection({
        host     : '121.42.211.96',
        user     : 'root',
        password : '123456',
        database : 'angualr'
    });
    return connection;
};