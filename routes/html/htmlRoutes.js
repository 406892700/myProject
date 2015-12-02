/**
 * Created by Administrator on 2015/10/10.
 */
module.exports = function(app){
    app.get('/flush',function(req,res){
      res.render('html5/flush/flush',{});
    });
    app.get('/preview',function(req,res){
        res.render('html5/preview/layout',{});
    });

    app.get('/price',function(req,res){
        res.render('html5/priceControl/index',{});
    });

    app.get('/angular', function (req,res) {
        res.render('html5/angularDemo/angular',{});
    });

    app.get('/angularSelect', function (req,res) {
        res.render('html5/angularDemo/select',{});
    });

    app.get('/cannotdown', function (req,res) {
        res.render('html5/cannotdown/index',{});
    });
    
    
    app.get('/getMsg', function (req,res) {
        res.json({'msg':'123'});
    });


    app.get('/juicer', function (req,res) {
        res.render('html5/juicer/juicer',{});
    });


    app.get('/share',function(req,res){
        res.render('html5/sharePlugin/index',{});
    });
    
    
    app.get('/dateTable', function (req,res) {
        res.render('html5/dataTable/index',{});
    });

    app.get('/p_reg',function(req,res){
        res.render('html5/courseRegister/index',{});
    });
};
