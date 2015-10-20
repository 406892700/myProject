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
};
