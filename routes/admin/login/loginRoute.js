/**
 * Created by Administrator on 2015/9/9.
 */
module.exports = function(app){
    app.get('/login',function(req,res){
        var arg =  req.query.toggle;
        if(!arg){//������ʱ
            if(req.session.user){//����Ѿ����ڵ�½״̬���Ǿ�ֱ�����ص������
                res.render('/admin/dashboard/index');
            }
        }
        res.render('admin/login/login1',{});
    });
};