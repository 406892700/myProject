/**
 * Created by Administrator on 2015/9/9.
 */


/*
*����·���ļ������ļ�
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