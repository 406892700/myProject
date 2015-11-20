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

    function Xobj(elem,selector){
        this.selector = selector;
        this.domElem = elem;
    }

    Xobj.prototype = {
        addClass:function(classList){
            console.log('addClass');
        },
        hasClass:function(className){

        },
        removeClass: function (className) {

        },
        toggleClass:function(className){

        },
        fadeIn:function(duration,callback){

        },
        fadeOut:function(duration,callback){

        },
        remove:function(){
            this.domElem.parentNode.removeChild(this.domElem);
            return this;
        },
        bind:function(eventType,callback,data){

        },
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
        var nodeList = document.querySelectorAll(selector),
            XobjList = [];
        Array.prototype.map.call(nodeList,function(v,i){
            XobjList.push(new Xobj(v,selector));
        });

        return XobjList;
    }

    function domReady(callback){
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