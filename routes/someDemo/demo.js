/**
 * Created by Administrator on 2015/11/23.
 */
module.exports = function(app){
    app.get('/jQueryDemo',function(req,res){
        res.render('someDemo/index',{});
    });

    app.get('/bfc',function(req,res){
        res.render('someDemo/BFC',{});
    });

    app.get('/hack',function(req,res){
        res.render('someDemo/hack789',{});
    });
    
    app.get('/float', function (req,res) {
        res.render('someDemo/float',{});
    });
    
    app.get('/srollFix', function (req,res) {
        res.render('someDemo/scrollFix/index',{});
    });

    app.get('/fakeScroll', function (req,res) {
        res.render('someDemo/fakeScroll/diyScroll',{});
    })
};