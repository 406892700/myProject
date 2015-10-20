/**
 * Created by Administrator on 2015/9/18.
 */
var mysql = require('mysql');
module.exports = function(app){
    var connection = require('../connection')(app);
    app.get('/europe',function(req,res){
        res.render('waibao/travel/index');
    });
    
    app.get('/laomei', function (req,res) {
        res.render('waibao/laomei/register');
    });
    
    app.get('/laomeiSubmit', function (req,res) {
        var obj = req.query;

        connection.connect();
        connection.query('insert into p_info values (?,?,?)',obj.name,obj.phone,obj.address,function(err,result){
            if(err) throw err;
            else{
                connection.end();
                res.json({'name':'提交成功！'});
            }
        });

    })
};