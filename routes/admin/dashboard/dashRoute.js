/**
 * Created by Administrator on 2015/10/26.
 */
module.exports = function(app){
    /*
    * 普通的页面跳转 start
    * */
    var util = require('../../routesUtil');//路由工具方法
    //登录页
    app.get('/login',function(req,res){
        var arg =  req.query.toggle;
        if(!arg){//不传参时
            if(req.session.user){//如果已经存在登陆状态，那就直接跳回到主面板
                //res.render('/admin/dashboard/index');
                res.redirect('/dashboard');
            }
        }
        res.render('admin/login/login1',{});

    });


    //添加商品页面
    app.get('/addGoods',function(req,res){
        res.render('admin/demo/addGoods',{'title':'添加商品'})
    });

    //用户注册页
    app.get('/register',function(req,res){
        res.render('admin/demo/register',{'title':'用户注册'});
    });

    //进入仪表盘
    app.get('/dashboard',function(req,res){
        if(!req.session.user){
            res.render('admin/login/login1');
        }else{
            res.render('admin/dashboard/index',{'title':'主页面'});
        }
    });

    /*
     * 普通的页面跳转 end
     * */

    /*登录*/
    app.post('/loginAction',function(req,res){
        var conn = require('../../connection')(app),
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
                    //res.render('admin/dashboard',{user:req.session.user});
                    res.redirect('/dashboard');
                }
            }
        });
    });


    app.get('/loginout',function(req,res){
        req.session.destroy();
        res.redirect('/login');
    });

    /*用户注册*/
    app.post('/registerAction',util.handlePost(),function(req,res){
        var conn = require('../../connection')(app),
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
        var conn = require('../../connection')(app);
        conn.connect();

        conn.query('select g_type_id,g_type_name from t_type', function(err, rows, fields) {
            if (err) throw err;
            res.json({'code':1,data:rows});
        });
        conn.end();
    });

    /*添加商品信息*/
    app.post('/addGoodsInfo',util.handlePost(),function(req,res){
        console.log(req.session);
        var conn = require('../../connection')(app),
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
    
    
    app.get('/getOrderList', function (req,res) {
        console.log(req.query);
        util.baseExtend();
        var arg = req.query,
            statIndex = arg._iDisplayStart,
            displayLength = arg.iDisplayLength,
            echo = arg.echo,
            total,
            run = util.syncify,
            obj = {},
            conn = require('../../connection')(app),
            //sql = 'select t.o_order_id,t.g_create_date,t.status from t_order t, t_order_goods og where t.g_order_id = og.g_order_id';
            /*sql = 'SELECT ' +
                'o.g_order_id AS orderId, ' +
                'g.g_name AS goodsName, ' +
                'og.g_goods_num AS goodsNum, ' +
                'o.g_ceate_date AS createDate, ' +
                'o.`status` AS orderStatus, ' +
                'o.note AS orderNote ' +
                'FROM ' +
                't_order o, ' +
                't_order_goods og, ' +
                't_goods g ' +
                'WHERE ' +
                'o.g_order_goods = og.g_order_id ' +
                'AND ' +
                'og.g_good_id = g.g_id ' +
                'ORDER BY o.g_order_id ' +
                'limit 8,6',*/
            sql = 'select * from t_order',
            sql2 = 'select count(*) as length from t_order';

        conn.connect();

        run(function * gen(callback){
            var ret = yield conn.query(sql,callback),
                ret2 = yield conn.query(sql2,callback);
            console.log(ret2[1]);
            if(ret[0] || ret2[0]){
                console.log(ret[0]);
                console.log(ret2[0]);
                console.log('查找出错了！');
            }else{

                var aaData = [];
                obj.sEcho = echo;
                obj.iTotalRecords = ret2[1][0].length;
                obj.iTotalDisplayRecords = ret2[1][0].length;
                var temp = [];
                ret[1].map(function (v) {
                    temp.push(v.g_order_id);
                });

                var sql3  = 'select og.g_order_id as o_id ,og.g_goods_num,g.g_name from t_order_goods og,t_goods g where og.g_good_id = g.g_id and og.g_order_id in ('+temp.join(',')+')';
                console.log(sql3);
                var run1 = util.syncify;
                run1(function * gen1(callback1) {
                    var ret3 =  yield conn.query(sql3,callback1);
                    console.log(ret3[1]);

                });

                /*var x = [
                    { o_id: 1, g_goods_num: 3, g_name: '精品语句' },
                    { o_id: 2, g_goods_num: 33, g_name: '的说法都是' },
                    { o_id: 2, g_goods_num: 12, g_name: '的说法都ddd' },
                    { o_id: 3, g_goods_num: 2, g_name: '的说法都ddd' },
                    { o_id: 4, g_goods_num: 343, g_name: '的说dsffds都是f' },
                    { o_id: 4, g_goods_num: 33, g_name: '的说法都是' },
                    { o_id: 6, g_goods_num: 22, g_name: '3' }
                ];


                var getTpl = function(obj){
                    var tmp = {},
                        idArr = [];
                    obj.map(function(v,i){
                        var cId = v.o_id,
                            cNum = v.g_goods_num,
                            cName = v.g_name;
                        if(idArr.indexOf(cId) == -1){
                            idArr.push(cId);
                            tmp[cId] = {o_id:cId,goods_info:[cName+' * '+cNum]};
                            //tmp.push({o_id:cId,goods_info:[cName+' * '+cNum]})
                        }else{
                            tmp[cId].goods_info.push(cName+' * '+cNum);
                        }
                    });

                    return tmp;
                };

                getTpl(x);*/
                /*ret[1].map(function(v,i){
                    var tmp = [],
                        sql3 = 'select og.g_goods_num,g.g_name from t_order_goods og,t_goods g where og.g_good_id = g.g_id and og.g_order_id ='+v.g_order_id,
                        run1 = util.syncify;
                    tmp.push(v.g_order_id);
                    run1(function * gen1(callback1) {
                        var ret3 =  yield conn.query(sql3,callback1),
                            goodsInfo = "";
                        ret3[1].map(function(v,i){
                            goodsInfo += v.g_name+'*'+v.g_goods_num;
                        });
                        tmp.push(goodsInfo);
                        tmp.push(v.g_ceate_date);
                        tmp.push(v.status);
                        tmp.push(v.note);
                        aaData.push(tmp);
                        console.log(tmp);
                    });
                });*/

                /*res.json({'msg':'商品添加成功！'});*/
            }
        });

      /*  var obj = {
            /!*"sEcho": 0,
            "iTotalRecords": 30,
            "iTotalDisplayRecords": 30,*!/
            "sEcho": 3,
            "iTotalRecords": 57,
            "iTotalDisplayRecords": 57,
            "aaData": [
                ['Gecko','All others','Platform(s)','Engine version'],
                ['Gecko','All others','Platform(s)','Engine version'],
                ['Gecko','All others','Platform(s)','Engine version'],
                ['Gecko','All others','Platform(s)','Engine version'],
                ['Gecko','All others','Platform(s)','Engine version'],
                ['Gecko','All others','Platform(s)','Engine version'],
                ['Gecko','All others','Platform(s)','Engine version'],
                ['Gecko','All others','Platform(s)','Engine version'],
                ['Gecko','All others','Platform(s)','Engine version'],
                ['Gecko','All others','Platform(s)','Engine version'],
                ['Gecko','All others','Platform(s)','Engine version'],
                ['Gecko','All others','Platform(s)','Engine version'],
                ['Gecko','All others','Platform(s)','Engine version'],
                ['Gecko','All others','Platform(s)','Engine version'],
                ['Gecko','All others','Platform(s)','Engine version'],
                ['Gecko','All others','Platform(s)','Engine version'],
                ['Gecko','All others','Platform(s)','Engine version'],
                ['Gecko','All others','Platform(s)','Engine version'],
                ['Gecko','All others','Platform(s)','Engine version'],
                ['Gecko','All others','Platform(s)','Engine version'],
                ['Gecko','All others','Platform(s)','Engine version'],
                ['Gecko','All others','Platform(s)','Engine version']
            ]
        };*/

    });
};