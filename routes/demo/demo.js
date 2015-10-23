/**
 * Created by Administrator on 2015/10/21.
 */
module.exports = function(app){
    var util = require('../routesUtil');//路由工具方法
    /*添加商品*/
    app.get('/addGoods',function(req,res){
        res.render('admin/demo/addGoods',{'title':'添加商品'})
    });

    /*获取商品类别*/
    app.get('/getGoodsType', function (req,res) {
        var conn = require('../connection')(app);
        conn.connect();

        conn.query('select g_type_id,g_type_name from t_type', function(err, rows, fields) {
            if (err) throw err;
            res.json({'code':1,data:rows});
        });
        conn.end();
    });

    app.post('/addGoodsInfo',util.handlePost(),function(req,res){
        var conn = require('../connection')(app),
            run = util.syncify,
            data = req.body,
            sql = 'insert into t_goods(' +
                'g_name,' +
                'g_price,' +
                'g_store_num,' +
                'g_type,' +
                'g_note) values (\''+data.g_name+'\',\''+data.g_price+'\','+0+',\''+data.g_type+'\',\''+data.g_note+'\')';

        console.log(sql);
        conn.connect();

        run(function * gen(callback){
            var ret = yield conn.query(sql,callback);
            if(ret[0]){
                console.log(ret[0]);
                console.log('插入出错了！');
            }else{
                conn.end();
                res.json({'msg':'商品添加成功！'});
            }
        });


    });


    /*获取商品类别*/
    app.get('/getGoodsType', function (req,res) {

        var conn = require('../connection')(app),
            run = util.syncify;
        conn.connect();

        run(function * gen(resume) {
            var ret = yield conn.query('select g_type_id,g_type_name from t_type', resume);
            var ret1 = yield conn.query('select * from t_goods', resume);
            if(ret[0] || ret1[0]){
                console.log('出错了！');
            }else{
                var temp = [].concat(ret[1],ret1[1]);
                conn.end();
                res.json({'code':1,data:temp});
            }
        });
    });
};