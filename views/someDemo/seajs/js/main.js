/**
 * Created by xhy on 15/12/22.
 */
define(function(require,exports,module){
    var $ = require('xquery'),
        dialog = require('./dialog')('heheheheeh');
    dialog.show();
    setTimeout(function () {
        dialog.hide();
    },2000);

});