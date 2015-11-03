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

    //转换数据集对象
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

    //获取订单列表
    app.get('/getOrderList', function (req,res) {
        util.baseExtend();
        var arg = req.query,
            statIndex = arg.iDisplayStart,
            displayLength = arg.iDisplayLength,
            echo = arg.sEcho,
            run = util.syncify,
            obj = {},
            conn = require('../../connection')(app),
            sql = 'select o.g_order_id as o_id,o.g_ceate_date as create_date,o.status as status,o.note as note from t_order o order by create_date limit '+statIndex+','+displayLength+'',
            sql2 = 'select count(*) as length from t_order';

        conn.connect();

        run(function * gen(callback){
            var ret = yield conn.query(sql,callback),
                ret2 = yield conn.query(sql2,callback);
            if(ret[0] || ret2[0]){
                console.log(ret[0]);
                console.log(ret2[0]);
                console.log('查找出错了！');
            }else{
                obj.sEcho = echo;
                obj.iTotalRecords = ret2[1][0].length;
                obj.iTotalDisplayRecords = ret2[1][0].length;
                var temp = [];
                ret[1].map(function (v) {
                    temp.push(v.o_id);
                });

                var sql3  = 'select og.g_order_id as o_id ,og.g_goods_num,g.g_name from t_order_goods og,t_goods g where og.g_good_id = g.g_id and og.g_order_id in ('+temp.join(',')+')';
                var run1 = util.syncify;
                run1(function * gen1(callback1) {
                    var ret3 =  yield conn.query(sql3,callback1),
                        otherInfo = getTpl(ret3[1]);
                    ret[1].map( function(v,i){
                        v.goods_info = otherInfo[v.o_id].goods_info.join('<br>');
                        v.create_date = new Date(v.create_date).Format('yyyy-MM-dd hh:mm:ss');
                    });
                    obj.aaData = ret[1];
                    conn.end();
                    res.json(obj);
                });
            }
        });

    });


    //获取订单详情
    app.get('/getOrderDetail', function (req,res) {
        var id = req.query.id || undefined;
        if(!id) {
            return false;
        }

        var sql = 'select o.g_order_id as o_id ,' +
                'g.g_id as g_id ,' +
            'g.g_name as g_name ,' +
            'g.g_price as g_price ,' +
            'og.g_goods_num as g_num ,' +
            'o.g_ceate_date as o_create_date ,' +
            'o.status as o_status ,' +
            'o.note as o_note ' +
            ' from t_order o,t_order_goods og ,t_goods g where o.g_order_goods = og.g_order_id and og.g_good_id = g.g_id and o.g_order_id ='+id,
            conn = require('../../connection')(app),
            run = util.syncify;
        console.log(sql);
        conn.connect();
        run(function *gen(callback){
            var ret = yield conn.query(sql,callback);
            if(ret[0]){
                console.log(ret[0]);
                console.log('查找出错了！');
            }else{

                var json = (function(y) {
                    var temp = [],
                        json = {};
                    y.map(function(v, i) {
                        temp.push({
                            'g_id':v.g_id,
                            'name':v.g_name,
                            'price':v.g_price,
                            'g_num':v.g_num
                        });
                    });

                    json.o_id = y[0].o_id;
                    json.goods_info = temp;
                    json.create_date = new Date(y[0].o_create_date).Format('yyyy-MM-dd hh:mm:ss');
                    json.o_status = y[0].o_status;
                    json.o_note = y[0].o_note;
                    return json;
                })(ret[1]);
                console.log(json);

                res.json(json);
            }
        });


    });


    /*获取商品列表*/
    app.get('/getGoodsList',function(req,res){
        util.baseExtend();
        var arg = req.query,
            statIndex = arg.iDisplayStart,
            displayLength = arg.iDisplayLength,
            echo = arg.sEcho,
            run = util.syncify,
            obj = {},
            conn = require('../../connection')(app),
            sql = 'SELECT g.g_id AS gid,' +
                    'g.g_name AS gname, ' +
                    'g.g_pic AS gpic, ' +
                    'g.g_description AS gdes, ' +
                    'g.g_price AS gprice, ' +
                    'g.g_store_num AS gstore, ' +
                    't.g_type_name AS gtype, ' +
                    'g.g_note AS gnote, ' +
                    'u.nickname AS nickname, ' +
                    'g.g_status AS gstatus, ' +
                    'g.g_add_date AS gadddate, ' +
                    'g.g_modify_date AS gmodifydate ' +
                    'FROM t_goods ' +
                    'g, t_type t, ' +
                    't_user u ' +
                    'WHERE g.g_type = t.g_type_id ' +
                    'AND ' +
                    'g.g_operator = u.user_id limit '+statIndex+','+displayLength,
            sql2 = 'select count(*) as length from t_goods';

        run(function *gen(callback){
            var ret = yield conn.query(sql,callback),
                ret1 = yield  conn.query(sql2,callback);
            if(ret[0] || ret1[0]){
                console.log('出错了！');
                console.log(ret[0]);
                console.log(ret1[0]);
            }else{
                obj.sEcho = echo;
                obj.iTotalRecords = ret1[1][0].length;
                obj.iTotalDisplayRecords = ret1[1][0].length;
                ret[1].map(function(v,i){
                   v.gadddate = new Date(v.gadddate).Format('yyyy-MM-dd hh:mm:ss');
                    v.gmodifydate = new Date(v.gmodifydate).Format('yyyy-MM-dd hh:mm:ss');
                });
                obj.aaData = ret[1];
                res.json(obj);
            }

        });

    });


    /*商品图片上传*/
    var multipartMiddleware = require('connect-multiparty')(),
    fs = require('fs');
    app.post('/uploadPic',multipartMiddleware, function (req,res) {
        var files = req.files;
        console.log(req.files);
        console.log(req.body.arg);
        for(var i in files){
            var o_path = files[i].path,
                t_path = 'public/images/upload/'+files[i].originalFilename,
                readStream=fs.createReadStream(o_path),
                writeStream=fs.createWriteStream(t_path);
            readStream.pipe(writeStream);
            readStream.on('end',function(){

            });
        }
        res.json({'code':'1',data:'图片上传成功！'});
    });


};