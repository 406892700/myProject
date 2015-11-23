/**
 * Created by Administrator on 2015/11/23.
 */
module.exports = function(app){
    app.get('/jQueryDemo',function(req,res){
        res.render('someDemo/index',{});
    });
};