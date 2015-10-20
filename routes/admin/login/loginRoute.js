/**
 * Created by Administrator on 2015/9/9.
 */
module.exports = function(app){
    app.get('/login',function(req,res){
        var connection = require('../../connection')(app);

        connection.connect();

        connection.query('select * from person', function(err, rows, fields) {
            if (err) throw err;

            console.log('The solution is: ', rows[0]);
        });

        connection.end();

        res.render('admin/login/login',{});
    });
};