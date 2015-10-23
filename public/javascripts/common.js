/**
 * Created by Administrator on 2015/10/22.
 */
//重写控制台方法（不理会低版本的浏览器）
var consoleArgs = {
    normal:'background-color:#0078d8;color:#fff',
    warn:'background-color:yellow;color:#000',
    error:'background-color:#d00000;color:#fff',
    biggest:'font-size:16px;color:#d00000'
};
console.Log = function(text){
    console.log('%c'+text,consoleArgs.normal);
};

console.logWarn = function(text){
    console.log('%c'+text,consoleArgs.warn);
};

console.logErr = function (text) {
    console.log('%c'+text,consoleArgs.error);
};

console.logBig = function(text){
    console.log('%c'+text,consoleArgs.biggest);
};