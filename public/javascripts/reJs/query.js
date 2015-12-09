/**
 * Created by xhy on 15/11/17.
 */
define([],function(){
    var query = function(selector){
        return document.querySelectorAll(selector);
    }

    return {
        query:query
    }
});