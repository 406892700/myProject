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
    },
    /*
     * 一些原型方法的扩展
     *
     * */
    baseExtend:function(){
        Date.prototype.Format = function (fmt) {
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        };
    }
};