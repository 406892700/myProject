/**
 * Created by Administrator on 2015/9/9.
 */

var routeModule = [
    /*require('./routes/index'),*/
    require('./routes/admin/login/loginRoute'),
    require('./routes/waibao/waibao'),
    require('./routes/html/htmlRoutes')
];


module.exports = function(app){
    routeModule.map(function(v){
       v(app);
    });
};