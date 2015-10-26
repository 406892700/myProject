/**
 * Created by Administrator on 2015/9/9.
 */
module.exports = function(app){
    app.get('/login',function(req,res){
        var arg =  req.query.toggle;
        if(!arg){//不传参时
            if(req.session.user){//如果已经存在登陆状态，那就直接跳回到主面板
                res.render('/admin/dashboard/index');
            }
        }
        res.render('admin/login/login1',{});
    });
};