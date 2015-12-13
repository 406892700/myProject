/**
 * Created by Administrator on 2015/11/20.
 *   前端小类库
 *   author xhy
 *   date 2015-12
 */
var $ = (function(window,undefined){
    /*ajax对象构造函数*/
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

    /*
    * ajax原型方法
    * */
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

    /*
    * 核心构造函数
    * */
    function Xobj(elemArr,selector){
        this.selector = selector;
        this.domElemList = elemArr;
        this.opIndex = 0;
        this.length = this.domElemList.length;
    }

    /*
    * 一些工具方法
    * */
    var _util = {
        //驼峰式
        camelCase: function (str) {
            str = str.replace(/^-/,'');
            return str.replace(/(-[\da-z])/gi,function(word,letter){
                return RegExp.$1.substr(1,1).toUpperCase();
            });
        },
        //获取对象类型
        getType : function(obj){
            var regx = /^\[object (\w+)\]$/ig,
                o = {};
            return regx.exec(o.toString.call(obj))[1].toLowerCase();
        },
        //判断是不是类数组元素（暂时不管window对象）
        isArraylike : function( obj ) {
            var length = obj.length,
                type = _util.getType( obj );

            if ( obj.nodeType === 1 && length ) {
                return true;
            }

            return type === "array" || type !== "function" &&
                ( length === 0 ||
                typeof length === "number" && length > 0 && ( length - 1 ) in obj );
        },
        //获取所有参数
        getQuery : function () {
            var search = window.location.search.substr(1),
                tmp = {};
            search.split('&').map(function (v,i) {
                var _t = v.split('=');
               tmp[_t[0]] = _t[1];
            });
            return tmp;
        },
        //获取单个参数
        getQueryByName : function(name) {
            var r = window.location.search.substr(1).match(reg);
            if (r != null)
                return unescape(r[2]);
            return null;
        },
        //判断是不是元素节点
        isElement: function (ele) {
            if(typeof ele == 'string' || typeof ele == 'undefined'){
                return;
            }
            var nodeType = ele.nodeType;
            if(nodeType && nodeType == 1){
                return true;
            }
            return false;
        },
        /*
        * @ context 执行上下文
        * @ selector 选择器
        * @ direc 是否直接子元素
        * */
        findElement: function (context,selector,direc) {//查找元素
            var slcStr = '',
                ret;
            direc = typeof direc === 'undefined' ? ' ':' > ';
            if(_util.isElement(context)){//判断上下文是不是元素
                var id = context.id;
                if(id ){
                    slcStr = '#'+id+direc+selector;
                    console.log(slcStr);
                    return document.querySelectorAll(slcStr);
                }else{
                    var idStr = context.id = '__unique__'+new Date().getTime();//添加一个唯一的id，用于限定上下文
                    slcStr = '#'+idStr+direc+selector;
                    ret = document.querySelectorAll(slcStr);
                    context.removeAttribute('id');//用完以后删掉无用的id
                    console.log(context.id);
                    return ret;
                }

            }else if(typeof context == 'string'){//直接当做选择器
                return document.querySelectorAll(context+direc+selector);
            }
        },
        //设置元素的唯一标识用完
        setUnique: function (elem) {
            var id = '__unique__'+new Date().getTime();
            elem.id = id;
            return id;
        },
        //判断两个元素之间是否存在包含关系
        ifContain: function (outerElem, innerElem) {
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
            outerElem.removeAttribute('id');//用完删除
            return flag;
        },
        // 判断是不是function
        isFunction:function(obj){
            return this.getType(obj) === 'function';
        },
        //判断是不是数组
        isArray: function (obj) {
          return this.getType(obj) === 'array';
        },
        //判断是不是window对象
        isWindow: function (obj) {
          return obj != null && obj === obj.window;
        },

        //判断是不是普通对象
        isPlainObject: function (obj) {
            // Not plain objects:
            //不是普通对象的特征
            // - Any object or value whose internal [[Class]] property is not "[object Object]"
            //内部类不是[Object Object] 也就是说借用Obect的提哦String返回的值不是object
            // - DOM nodes
            //DOM节点
            // - window
            // window对象
            if (this.getType( obj ) !== "object" || obj.nodeType || this.isWindow( obj ) ) {//三个特性有一个或一个以上不符合
                return false;
            }

            // Support: Firefox <20
            // The try/catch suppresses exceptions thrown when attempting to access
            // the "constructor" property of certain host objects, ie. |window.location|
            // https://bugzilla.mozilla.org/show_bug.cgi?id=814622
            //这个是专门用来判断一些特殊浏览器的对象，比如说window.location对象
            try {
                if ( obj.constructor &&
                    !Object.prototype.hasOwnProperty.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
                    return false;
                }
            } catch ( e ) {
                return false;
            }

            // If the function hasn't returned already, we're confident that
            // |obj| is a plain object, created by {} or constructed with new Object

            //如果上面都没有返回，那我们就能确定当前这个对象是一个普通对象，是由字面量{}或者new Object()创建的
            return true;
        },

        //判断数组或类数组元素中是否包含指定的元素
        ifArrayIn: function (item,arr) {
            for(var i = 0,length = arr.length;i<length;i++){
                if(item === arr[i]){
                    return item;
                }
            }

            return null;
        },
        //把类数组对象转化成数组
        toArray: function (arrlike) {
            if(this.isArraylike(arrlike)){
                return [].slice.call(arrlike);
            }
            throw Error('该对象无法转换成数组对象');
            return null;

        },
        
        //合并多个对象(从jQuery那边偷过来的)
        extend: function () {
            var options, name, src, copy, copyIsArray, clone,
                target = arguments[0] || {},//第一个参数~如果第一个参数为boolean型，将执行深/浅克隆
                i = 1,
                length = arguments.length,//参数数量
                deep = false;//默认浅克隆

            // Handle a deep copy situation
            //深度克隆
            if ( typeof target === "boolean" ) {
                deep = target;
                target = arguments[1] || {};//克隆目标为第二个参数
                // skip the boolean and the target
                i = 2;
            }

            // Handle case when target is a string or something (possible in deep copy)
            //控制目标对象为一个字符串或者其他的类型|（可能在深克隆时）
            if ( typeof target !== "object" && _util.getType(target) === 'function' ) {
                target = {};
            }

            // extend jQuery itself if only one argument is passed
            //根据参数判断是不是扩展jquery对象自身
            if ( length === i ) {
                target = this;//克隆目标为第一个jquery对象本身
                --i;//根据情况选择性忽略第一个参数（保证后续的遍历只会被执行一次）
            }

            //遍历除了克隆目标和深浅克隆标志参数外的所有参数
            for ( ; i < length; i++ ) {
                // Only deal with non-null/undefined values
                //只用来处理正常情况
                if ( (options = arguments[ i ]) != null ) {
                    // Extend the base object
                    for ( name in options ) {
                        src = target[ name ];
                        copy = options[ name ];

                        // Prevent never-ending loop
                        //避免死循环
                        if ( target === copy ) {//不理解什么时候会发生？？
                            continue;
                        }

                        // Recurse if we're merging plain objects or arrays
                        //在合并普通对象或者数组的时候使用递归调用方式
                        if ( deep && copy && ( this.isPlainObject(copy) || (copyIsArray = this.isArray(copy)) ) ) {
                            if ( copyIsArray ) {//是数组
                                copyIsArray = false;
                                clone = src && this.isArray(src) ? src : [];

                            } else {//是普通对象
                                clone = src && this.isPlainObject(src) ? src : {};
                            }

                            // Never move original objects, clone them
                            //递归调用本身进行克隆
                            target[ name ] = this.extend( deep, clone, copy );

                            // Don't bring in undefined values
                            //浅拷贝，且属性值不是undefined
                        } else if ( copy !== undefined ) {
                            target[ name ] = copy;
                        }
                    }
                }
            }

            // Return the modified object
            return target;//返回被更改后的对象
        }
    };

    /*
    * 核心对象的原型方法
    * */
    Xobj.prototype = {
        constructor:Xobj,
        //获取当前操作元素
        getOpElem: function () {
            return this.domElemList[this.opIndex];
        },
        //获取元素
        getE : function(){
            return this.getOpElem();
        },
        //设置样式值
        css: function (prop,value) {
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
        //获取className的工具函数
        _getClassArr:function (callback) {
            var opElems = this.domElemList;
            [].map.call(opElems,function(v,i){
                var classArr = v.className.split(/\s+/);
                v.className = callback(classArr).trim();
            });
            return this;
        },
        //添加类
        addClass:function(className){
            return this._getClassArr(function(classArr){
                if(classArr.indexOf(className) === -1){
                    classArr.push(className);
                }
                return classArr.join(' ');
            });
        },
        //判断是都有类
        hasClass:function(className){
            var opElem = this.getOpElem();

            if(opElem.className.indexOf(className) == -1){
                return false;
            }
            return true;
        },
        //移除class
        removeClass: function (className) {
            return this._getClassArr(function(classArr){
                var index = classArr.indexOf(className);
                if(index !== -1){
                    classArr.splice(index,1);
                }
                return classArr.join(' ');
            });
        },
        //切换class
        toggleClass:function(className){
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
        //向文档中append元素
        append:function(str){
            var fragment = document.createDocumentFragment(),
                container = document.createElement('div'),
                opElems = this.domElemList;
            container.innerHTML = str;
            var cN = container.childNodes;
            for(var i = 0;i<cN.length;i++){
                fragment.appendChild(cN[i]);
            }
            [].map.call(opElems,function (opElem,i) {
                opElem.appendChild(fragment);
            });

            return this;
        },
        //向文档中prepend元素
        prepend: function (str) {
            var fragment = document.createDocumentFragment(),
                container = document.createElement('div'),
                opElems = this.domElemList;
            container.innerHTML = str;
            var cN = container.childNodes;
            for(var i = 0;i<cN.length;i++){
                fragment.appendChild(cN[i]);
            }
            [].map.call(opElems,function (opElem,i) {
                opElem.insertBefore(fragment,opElem.firstChild);
            });

            return this;
        },
        //移除元素
        remove:function(){
            var opElem = this.getOpElem();
            opElem.parentNode.removeChild(opElem);
            this.opIndex = 0;
            return this;
        },
        //选择
        eq:function(index){
            index = index||0;
            if(index > this.length-1){
                throw 'Array out of Range';
            }
            this.opIndex = index;
            return this;
        },
        //回到第一个元素
        end:function(){
            return this.eq();
        },
        //bind:function(eventType,callback,data){
        //
        //},
        //执行一些dom操作，这个会破坏链式操作，无法用end返回
        _stateChange: function (domElem) {
            domElem = _util.isArraylike(domElem) ? domElem : [domElem];
            //domElem = _util.getType(domElem).toLowerCase() !== 'array' ? [domElem]:domElem;
            this.domElemList = domElem;
            this.opIndex = 0;
            this.length = this.domElemList.length;
            return this;
        },
        //找到父元素，
        parent:function(){
            var opElem = this.getOpElem();
            return this._stateChange(opElem.parentNode);
        },
        //孩子元素
        children:function(selector){
            var opElem = this.getOpElem(),
                retElem;
            selector = selector ? selector : '*';
            retElem = _util.findElement(opElem,selector,true);
            return this._stateChange(retElem);
        },
        //递归寻找子元素
        find: function (selector) {
            var opElem = this.getOpElem(),
                retElem;
            selector = selector ? selector : '*';
            retElem = _util.findElement(opElem,selector);
            return this._stateChange(retElem);
        },
        //向上查找最近的祖先元素
        closest:function(selector){
            if(!selector){
                return this._stateChange(document.body);
            }
            var opElem = this.getOpElem(),
                copyInner = opElem,
                retElem,
                targetElems = document.querySelectorAll(selector);
            while(copyInner = copyInner.parentNode){
                if(retElem = _util.ifArrayIn(copyInner,targetElems)){
                    return this._stateChange(retElem);
                }
            }

            return this._stateChange(document.body);

        },
        //缓存数据
        data:function(dataName,value){
            var opElems = this.domElemList,
                rdata = /data-([a-zA-Z0-9]*)/;
            if(arguments.length === 1 && typeof arguments[0] !== 'object'){//值的获取
                return opElems.dataset.dataName;
            }else if(arguments === 2){

            }
            [].map(function(v,i){

            });
        },
        //后向查找元素
        next: function (selector) {
            var opElem = this.getOpElem(),
                retElems,
                copyElem = opElem,
                tmp = [];
            if(selector === undefined){//查找直接后项元素
                var ret = opElem.nextElementSibling || [];
                return this._stateChange(ret);
            }

            retElems = _util.findElement(opElem.parentNode,selector,true);
            while(copyElem = copyElem.nextElementSibling){
                if(_util.ifArrayIn(copyElem,retElems)){
                    tmp.push(copyElem)
                    //return this._stateChange(copyElem);
                }
            }
            return this._stateChange(tmp);
        },
        //前向查找元素
        prev: function (selector) {
            var opElem = this.getOpElem(),
                retElems,
                copyElem = opElem,
                tmp = [];
            if(selector === undefined){//查找直接后项元素
                var ret = opElem.previousElementSibling || [];
                return this._stateChange(ret);
            }

            retElems = _util.findElement(opElem.parentNode,selector,true);
            while(copyElem = copyElem.previousElementSibling){
                if(_util.ifArrayIn(copyElem,retElems)){
                    tmp.push(copyElem);
                    //return this._stateChange(copyElem);
                }
            }
            return this._stateChange(tmp);
        },
        //设置元素attribute属性
        attr: function (attr,value) {
            var opElem = this.getOpElem(),
                opElems = this.domElemList;
            if(arguments.length === 1){//获取
                if(typeof attr == 'string'){
                    return opElem.getAttribute(attr);
                }else{
                    for(var i in attr){
                        [],map.call(attr[i],function(v,i){
                            v.setAttribute(attr,value);
                        });
                    }
                }

            }else if(arguments.length == 2){
                [].map.call(opElems, function (v,i) {
                    v.setAttribute(attr,value);
                });
            }else{
                return opElem.attributes;//返回元素的attributes属性
            }

            return this;
        },
        //text和html的公用方法
        _get_set_dom:function(text,type/*1 for text | 2 for html*/){
            var opElem = this.getOpElem(),
                opElems = this.domElemList;
            //console.log(typeof text);
            if(typeof text === 'undefined'){//表示是获取(那就只操作第一个匹配)
                if(type == 1){
                    return opElem.textContent;
                }else{
                    return opElem.innerHTML;
                }
            }else{//表示是设置(对所有匹配集合中得元素操作)
                [].map.call(opElems, function (v,i) {
                    if(type == 1){
                        v.textContent = text;
                    }else{
                        v.innerHTML = text;
                    }
                });
            }
            return this;
        },

        //获取或设置text
        text: function (text) {
            return this._get_set_dom(text,1);
        },

        //设置获取innerHTML
        html: function (strHtml) {
            return this._get_set_dom(strHtml,2);
        }

    };

    function get(selector){
        var nodeList = document.querySelectorAll(selector);
        nodeList = _util.toArray(nodeList);//转成数组对象
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

    var obj = _util.extend({},{
        ajax:function(opts){
            return new ajax(opts).initAjax();
        },
        get:get,
        domReady:domReady
    },_util);//合并返回值参数

    return obj;
})(window,undefined);