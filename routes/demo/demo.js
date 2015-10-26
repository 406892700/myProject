/**
 * Created by Administrator on 2015/10/21.
 */
module.exports = function(app){
    var util = require('../routesUtil');//路由工具方法
    /*添加商品*/
    app.get('/addGoods',function(req,res){
        res.render('admin/demo/addGoods',{'title':'添加商品'})
    });

    app.get('/register',function(req,res){
        res.render('admin/demo/register',{'title':'用户注册'});
    });

    app.get('/loginx',function(req,res){
        res.render('admin/demo/login',{'title':'用户登录'});
    });

    /*登录*/
    app.post('/loginAction',function(req,res){
        var conn = require('../connection')(app),
            crypto = require('crypto'),
            md5 = crypto.createHash('md5'),
            run = util.syncify,
            data = req.body;

        md5.update(data.password);
        var username = data.username,
            password = md5.digest('hex');
        var sql = 'select * from' +
                    ' t_user where ' +
                    'username =\''+username+'\' ' +
                    'and password = \''+password+'\'';

        run(function * gen(callback){
            var ret = yield conn.query(sql,callback);
            if(ret[0]){
                console.log(ret[0]);
                console.log('你特么弄错了！！');
            }else{
                console.log(ret[1]);
                if(ret[1].length == 0){
                    console.log('用户名或者密码输入错误！');
                }else{
                    console.log('登录成功！');
                    req.session.user = ret[1][0];
                   // res.json({'msg':'登录成功啦'});
                    res.render('admin/dashboard');
                }
            }
        });
    });

    app.post('/registerAction',util.handlePost(),function(req,res){
        var conn = require('../connection')(app),
            crypto = require('crypto'),
            md5 = crypto.createHash('md5'),
            run = util.syncify,
            data = req.body;

        md5.update(data.password);//md5加密

        var sql = 'insert into t_user set username = \''+data.username+'\',' +
                'password = \''+md5.digest('hex')+'\',' +
                'nickname = \''+data.nickname+'\',' +
                'register_time = \''+new Date().getTime()+'\',' +
                'status = \''+1+'\'';


        conn.connect();
        run(function * gen(callback){
            var ret = yield conn.query(sql,callback);
            if(ret[0]){
                console.log(ret[0]);
                console.log('你特么弄错了！');
            }else{
                conn.end();
                res.json({'msg':'注册成功！'});
            }
        });

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
        console.log(req.session);
        var conn = require('../connection')(app),
            run = util.syncify,
            data = req.body,
            sql = 'insert into t_goods(' +
                'g_name,' +
                'g_price,' +
                'g_store_num,' +
                'g_type,' +
                'g_note,' +
                'g_operator) values (\''+data.g_name+'\',\''+data.g_price+'\','+0+',\''+data.g_type+'\',\''+data.g_note+'\',\''+req.session.user.user_id+'\')';
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

    app.get('/testx', function (req, res) {

        // 检查 session 中的 isVisit 字段
        // 如果存在则增加一次，否则为 session 设置 isVisit 字段，并初始化为 1。
        if(req.session.isVisit) {
            req.session.isVisit++;
            res.send('<p>第 ' + req.session.isVisit + '次来此页面</p>');
        } else {
            req.session.isVisit = 1;
            res.send("欢迎第一次来这里");
            console.log(req.session);
        }
    });


    /*获取商品类别*/
   /* app.get('/getGoodsType', function (req,res) {

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
    });*/
};