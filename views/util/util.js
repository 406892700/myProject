/**
 * Created by Administrator on 2015/11/20.
 */
var $ = (function(window,undefined){
    function ajax(opts){//ajax方法
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

    function Xobj(elemArr,selector){//核心构造函数
        this.selector = selector;
        this.domElemList = elemArr;
        this.opIndex = 0;
        this.length = this.domElemList.length;
    }


    var _util = {//一些工具方法
        camelCase: function (str) {//驼峰式
            str = str.replace(/^-/,'');
            return str.replace(/(-[\da-z])/gi,function(word,letter){
                return RegExp.$1.substr(1,1).toUpperCase();
            });
        },
        getType : function(obj){//获取对象类型
            var regx = /^\[object (\w+)\]$/ig,
                o = {};
            return regx.exec(o.toString.call(obj))[1];
        },
        isArraylike : function( obj ) {//判断是不是类数组元素（暂时不管window对象）
            var length = obj.length,
                type = _util.getType( obj );

            if ( obj.nodeType === 1 && length ) {
                return true;
            }

            return type === "array" || type !== "function" &&
                ( length === 0 ||
                typeof length === "number" && length > 0 && ( length - 1 ) in obj );
        },
        getQuery : function () {//获取所有参数
            var search = window.location.search.substr(1),
                tmp = {};
            search.split('&').map(function (v,i) {
                var _t = v.split('=');
               tmp[_t[0]] = _t[1];
            });
            return tmp;
        },
        getQueryByName : function(name) {//获取单个参数
            var r = window.location.search.substr(1).match(reg);
            if (r != null)
                return unescape(r[2]);
            return null;
        },
        isElement: function (ele) {//判断是不是元素节点
            if(typeof ele == 'string' || typeof ele == 'undefined'){
                return;
            }
            var nodeType = ele.nodeType;
            if(nodeType && nodeType == 1){
                return true;
            }
            return false;
        },
        findElement: function (context,selector) {//查找元素
            var slcStr = '',
                ret;
            if(_util.isElement(context)){//判断上下文是不是元素
                var id = context.id;
                if(id ){
                    slcStr = '#'+id+' '+selector;
                    console.log(slcStr);
                    return document.querySelectorAll(slcStr);
                }else{
                    var idStr = context.id = '__unique__'+new Date().getTime();//添加一个唯一的id，用于限定上下文
                    slcStr = '#'+idStr+' '+selector;
                    ret = document.querySelectorAll(slcStr);
                    context.removeAttribute('id');//用完以后删掉无用的id
                    console.log(context.id);
                    return ret;
                }

            }else if(typeof context == 'string'){//直接当做选择器
                return document.querySelectorAll(context+' '+selector);
            }
        },
        setUnique: function (elem) {//设置元素的唯一标识用完
            var id = '__unique__'+new Date().getTime();
            elem.id = id;
            return id;
        },

        ifContain: function (outerElem, innerElem) {//判断两个元素之间是否存在包含关系
            var uniqueId = _util.setUnique(outerElem),
                //copyInner = innerElem.clone(true),
                copyInner = innerElem,
                flag = false;
            while(copyInner = copyInner.parentNode){
                //copyInner = copyInner.parentNode;
                if(copyInner.id === uniqueId){
                    flag = true;
                    break;
                }
            }
            return flag;
        }
    };

    Xobj.prototype = {
        constructor:Xobj,
        getOpElem: function () {//获取当前操作元素
            return this.domElemList[this.opIndex];
        },
        getE : function(){
            return this.getOpElem();
        },
        css: function (prop,value) {//设置样式值
            var opElems = this.domElemList,
                _arguments = arguments;
            if(_arguments.length < 1){
                return null;
            }else if(_arguments.length === 1 && typeof _arguments[0] !== 'object'){
                prop = _util.camelCase(prop);
                return window.getComputedStyle(this.getOpElem(),null)[prop];
            }

            [].map.call(opElems,function (opElem) {
               if(_arguments.length === 1){
                    for(var obj in _arguments[0]){
                        opElem.style[_util.camelCase(obj)] = _arguments[0][obj];
                    }
                }else{
                    prop = _util.camelCase(prop);
                    opElem.style[prop] = value;
                }
            });

            return this;

        },
        _getClassArr:function (callback) {//获取className的工具函数
            var opElems = this.domElemList;
            [].map.call(opElems,function(v,i){
                var classArr = v.className.split(/\s+/);
                v.className = callback(classArr).trim();
            });
            return this;
        },
        addClass:function(className){//添加类
            return this._getClassArr(function(classArr){
                if(classArr.indexOf(className) === -1){
                    classArr.push(className);
                }
                return classArr.join(' ');
            });
        },
        hasClass:function(className){//判断是都有类
            var opElem = this.getOpElem();

            if(opElem.className.indexOf(className) == -1){
                return false;
            }
            return true;
        },
        removeClass: function (className) {//移除class
            return this._getClassArr(function(classArr){
                var index = classArr.indexOf(className);
                if(index !== -1){
                    classArr.splice(index,1);
                }
                return classArr.join(' ');
            });
        },
        toggleClass:function(className){//切换class
            return this._getClassArr(function (classArr) {
                var index = classArr.indexOf(className);
                if(index !== -1){
                    classArr.splice(index,1);
                }else{
                    classArr.push(className);
                }

                return classArr.join(' ');
            });
        },
        append:function(str){//向文档中append元素
            var fragment = document.createDocumentFragment(),
                container = document.createElement('div'),
                opElem = this.getOpElem();
            container.innerHTML = str;
            var cN = container.childNodes;
            for(var i = 0;i<cN.length;i++){
                fragment.appendChild(cN[i]);
            }
            opElem.appendChild(fragment);
            return this;
        },
        prepend: function (str) {//向文档中prepend元素
            var fragment = document.createDocumentFragment(),
                container = document.createElement('div'),
                opElem = this.getOpElem();
            container.innerHTML = str;
            var cN = container.childNodes;
            for(var i = 0;i<cN.length;i++){
                fragment.appendChild(cN[i]);
            }
            opElem.insertBefore(fragment,opElem.firstChild);
            return this;
        },
        remove:function(){//移除元素
            var opElem = this.getOpElem();
            opElem.parentNode.removeChild(opElem);
            this.opIndex = 0;
            return this;
        },
        eq:function(index){//选择
            index = index||0;
            if(index > this.length-1){
                throw 'Array out of Range';
            }
            this.opIndex = index;
            return this;
        },
        end:function(){//回到第一个元素
            return this.eq();
        },
        //bind:function(eventType,callback,data){
        //
        //},
        _stateChange: function (domElem) {//执行一些dom操作，这个会破坏链式操作，无法用end返回
            domElem = _util.isArraylike(domElem) ? domElem : [domElem];
            //domElem = _util.getType(domElem).toLowerCase() !== 'array' ? [domElem]:domElem;
            this.domElemList = domElem;
            this.opIndex = 0;
            this.length = this.domElemList.length;
            return this;
        },
        parent:function(){//找到父元素，
            var opElem = this.getOpElem();
            return this._stateChange(opElem.parentNode);
        },

        childrens:function(selector){//孩子元素

        },
        find: function (selector) {//递归寻找子元素
            var opElem = this.getOpElem(),
                retElem;
            retElem = _util.findElement(opElem,selector);
            return this._stateChange(retElem);
        },
        closest:function(selector){//向上查找最近的祖先元素

        },
        data:function(dataName,value){//缓存数据
            var opElems = this.domElemList,
                rdata = /data-([a-zA-Z0-9]*)/;
            if(arguments.length === 1 && typeof arguments[0] !== 'object'){//值的获取
                return
            }else if(arguments === 2){

            }
            [].map(function(v,i){

            });
        },
        next: function (selector) {//后向查找元素
            var opElem = this.getOpElem(),
                retElem;
            if(selector === undefined){//查找直接后项元素
                return this._stateChange(opElem.nextElementSibling);
            }

            retElem = _util.findElement(opElem,selector);
            return this._stateChange(retElem);

        },

        prev: function (selector) {//前向查找元素
            var opElem = this.getOpElem();
            if(selector === undefined){//查找直接前项元素
                return this._stateChange(opElem.previousElementSibling);
            }
        },
        attr: function (attr,value) {//设置元素attribute属性
            
        },
        prop: function (prop,vlaue) {//设置元素属性

        }

    };

    function get(selector){
        var nodeList = document.querySelectorAll(selector);

        return new Xobj(nodeList,selector);
    }

    function domReady(callback){//文档加载完成函数
        document.addEventListener('DOMContentLoaded',callback);
    }


    function camelCase(str) {//驼峰式
        return str.replace(/(-[\da-z])/gi,function(word,letter){
            return RegExp.$1.substr(1,1).toUpperCase();
        });
        //return str;
    }

    return {
        ajax:function(opts){
            return new ajax(opts).initAjax();
        },
        get:get,
        domReady:domReady
    }
})(window,undefined);