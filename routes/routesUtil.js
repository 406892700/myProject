/**
 * Created by Administrator on 2015/10/23.
 */


/*
* 路由中的一些工具方法
*
* */

module.exports = {
    /*
     *     处理回调金字塔问题
     *
     * */
    syncify:function(gen){
        var gen_obj = gen(resume);
        function resume() {
            gen_obj.next(arguments);
        }
        gen_obj.next();
    },
    /*
    * 处理post请求（urlencoded类型的）
    *
    * */
    handlePost:function(){
        var bodyParser = require('body-parser'),
            urlencodedParser = bodyParser.urlencoded({ extended: false });

        return  urlencodedParser;
    }
};