/**
 * Created by Administrator on 2015/10/21.
 */
module.exports = function(app){
    /*添加商品*/
    app.get('/addGoods',function(req,res){
        res.render('admin/demo/addGoods',{'title':'添加商品'})
    });

    /*获取商品类别*/
    app.get('/getGoodsType', function (req,res) {
        var conn = require('../connection')(app);

        conn.connect();

        conn.query('select * from t_type', function(err, rows, fields) {
            if (err) throw err;

            console.log('The solution is: ', rows);
        });

        connection.end();
      res.json()
    })
};