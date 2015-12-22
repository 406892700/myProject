/**
 * Created by xhy on 15/12/22.
 */
define(function(require,exports,module){
    var $ = require('xquery');
    var Dialog = function (text) {
        this.__uid__ = '__dialog';
        this.text = text;
        return this.init();
    };
    
    Dialog.prototype.init = function () {
        var htmlStr =
            '<div id="'+this.__uid__+'" style="z-index:9999;display:none;border:1px solid #aaa;width:300px;background-color: #f5f5f5;position: absolute;left: 50%;top:50%;transform: translate(-50%,-50%);">' +
            this.text+
            '</div>';
        $('body').append(htmlStr);
        return this;
    }

    Dialog.prototype.show = function () {
        $('#__dialog').css('display','block');
    }

    Dialog.prototype.hide = function () {
        $('#__dialog').css('display','none');
    }

    module.exports = function (text) {
        return new Dialog(text);
    }
});