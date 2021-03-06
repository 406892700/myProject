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

    app.get('/gululoan', function (req, res) {
        res.render('html5/guluLoan/index',{});
    });

    app.get('/fastclick', function (req, res) {
        res.render('html5/testFastClick/index',{});
    });


    app.get('/audio1',function(req,res){
        res.render('html5/audio/index1',{});
    });

    app.get('/audio',function(req,res){
        res.render('html5/audio/audio',{});
    });

    app.get('/spinner',function(req,res){
        res.render('somePlugin/spinner/index',{});
    });

    app.get('/share_friend', function (req, res, next) {
        res.render('html5/share_weixin/share_weixin_friend',{});
    });


    app.get('/create_school', function (req, res, next) {
        res.render('html5/share_weixin/create_school',{});
    });

    app.get('/share_circle', function (req,res,next) {
        res.render('html5/share_weixin/share_weixin_circle',{});
    });

    app.get('/lottery', function (req, res, next) {
        res.render('html5/lottery/lottery',{});
    });

    app.get('/lottery/share', function (req, res, next) {
        res.render('html5/lottery/lotteryShare',{});
    });

    app.get('/testShare', function (req, res, next) {
        res.render('html5/lottery/test',{});
    });

    app.get('/oneyuan',function(req,res,next){
        res.render('html5/oneyuan/oneyuan',{});
    });


    app.get('/video',function(req,res,next){
        res.render('html5/video/index',{});
    });

    app.get('/attrCtrl',function(req,res,next){
        res.render('html5/attrControl/index',{});
    });

    app.get('/cookies',function(req,res,next){
        res.render('html5/cookies/cookies',{});
    });

    app.get('/es6',function(req,res,next){
        res.render('html5/ES6/es6',{});
    });


    app.get('/imgpreview',function(req,res,next){
        res.render('html5/imgPreview/imgPreview',{});
    });

};
