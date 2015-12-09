/**
 * Created by Administrator on 2015/11/20.
 */
var $ = (function(window,undefined){
    function ajax(opts){
        var _opt = {
            url:'',
            method:'GET',
            data:'',
            async:true,
            cache:true,
            contentType:'application/x-www-form-urlencoded',
            success:function(){},
            error:function(){}
        };

        for(var key in opts){
            _opt[key] = opts[key];
        }
        this.opts = _opt;
    }

    ajax.prototype = {
        constructor:ajax,
        getSearch: function () {
            var search = '?';
            if(typeof this.opts.data === 'object'){//如果需要传递额外参数
                var args = [];
                for(var key in this.opts.data){
                    args.push(key+'='+this.opts.data[key]);
                }
                search += args.join('&');
            }else{
                search += '';
            }

            if(!this.opts.cache){
                search += '&timeStamp='+(+new Date());
            }
            if(search.length == 1){
                search = '';
            }

            return search;
        },
        initAjax : function () {
            var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            if(this.opts.method.toUpperCase() == 'GET'){
                xhr.open('GET',this.opts.url+this.getSearch(),this.opts.async);
                xhr.send(null);
            }else{
                xhr.open('POST',this.opts.url,this.opts.async);
                xhr.setRequestHeader("Content-type", this.opts.contentType);
                xhr.send(this.getSearch().slice(1));
            }
            var success = this.opts.success,
                error = this.opts.error;


            xhr.onreadystatechange = function(evt){
                if(xhr.readyState == 4){
                    if(xhr.status === 200){
                        var data = JSON.parse(xhr.responseText);
                        success(data,xhr);
                    }else{
                        error(xhr);
                    }
                }
            };

        }
    };

    function Xobj(elemArr,selector){
        this.selector = selector;
        this.domElemList = elemArr;
        this.opIndex = 0;
        this.length = this.domElemList.length;
    }

    Xobj.prototype = {
        constructor:Xobj,
        addClass:function(classList){
            console.log('addClass');
        },
        hasClass:function(className){

        },
        removeClass: function (className) {

        },
        toggleClass:function(className){

        },
        append:function(str){

        },
        //animate:function(cssDeclare,speed,easing,callback){
        //
        //},
        //fadeIn:function(duration,callback){
        //
        //},
        //fadeOut:function(duration,callback){
        //
        //},
        remove:function(){
            var opElem = this.domElemList[this.opIndex];
            opElem.parentNode.removeChild(opElem);
            this.opIndex = 0;
            return this;
        },
        eq:function(index){
            index = index||0;
            if(index > this.length-1){
                throw 'Array out of Range';
            }
            this.opIndex = index;
            return this;
        },
        //bind:function(eventType,callback,data){
        //
        //},
        parent:function(selector){

        },
        childrens:function(selector){

        },
        closest:function(selector){

        },
        data:function(dataName){

        }

    };

    function get(selector){
        var nodeList = document.querySelectorAll(selector);

        //var Xobj = new Xobj(nodeList,selector);

        return new Xobj(nodeList,selector);
    }

    function domReady(callback){//文档加载完成函数
        document.addEventListener('DOMContentLoaded',callback);
    }

    return {
        ajax:function(opts){
            return new ajax(opts).initAjax();
        },
        get:get,
        domReady:domReady
    }
})(window,undefined);