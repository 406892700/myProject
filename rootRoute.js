/**
 * Created by Administrator on 2015/9/9.
 */


/*
*所有路由文件配置文件
*
* */
var routeModule = [
    /*require('./routes/index'),*/
    require('./routes/admin/login/loginRoute'),
    require('./routes/waibao/waibao'),
    require('./routes/html/htmlRoutes'),
    require('./routes/demo/demo')
];


module.exports = function(app){
    routeModule.map(function(v){
       v(app);
    });
};