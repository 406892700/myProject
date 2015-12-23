/**
 * Created by Administrator on 2015/12/23.
 */
var xAudio = (function($){
    var XAudio = function (src,elem) {
        this.audio = new Audio(src);
        this.id = 'a'+ (+new Date());
        this.elem = elem;
        var that = this;
        XAudio.prototype.init.call(that,elem);
    };


    /*
    * 工具函数
    * */
    var util = {
        //秒数转化为时分秒
        formatTime:function(seconds){
            var h=0,i=0,s=parseInt(seconds);
            if(s>60){
                i=parseInt(s/60);
                s=parseInt(s%60);
                if(i > 60) {
                    h=parseInt(i/60);
                    i = parseInt(i%60);
                }
            }
            // 补零
            var zero=function(v){
                return (v>>0)<10?"0"+v:v;
            };
            return [zero(h),zero(i),zero(s)].join(":");
        }
    };


    var callback = {
        canplay: function (audio,ctrl_btn,ctrl_bar,ctrl_time) {
            //audio.play();
            var loop = function(){
                var cTime = audio.currentTime,
                    aTime = audio.duration,
                    allWidth = ctrl_bar.width()-30;
                    ctrl_btn.css('left',allWidth*cTime/aTime+'px');
                ctrl_time.text(util.formatTime(aTime-cTime));

                if(aTime == cTime){
                    ctrl_btn.css('left','0px').toggleClass('paused');
                    audio.currentTime = 0;
                    ctrl_time.text(util.formatTime(audio.duration));
                }
            };
            loop();
            setInterval(loop,1000);
        },
        touchDrag : function (audio,ctrl_btn,ctrl_bar,ctrl_time) {
            var cTime = audio.currentTime,
                aTime = audio.duration,
                allWidth = ctrl_bar.width()-30;

            ctrl_btn.bind('touchstart', function (evt) {
                evt.preventDefault();
                var oX = evt.touches[0].clientX-35,
                    setPercent = function (offsetX,max) {
                        var left = ctrl_btn.css('left').slice(0,-2)* 1;
                        offsetX = offsetX+left;
                        if(offsetX<0){
                            offsetX = 0;
                        }else if(offsetX > max){
                            offsetX = max;
                        }
                        console.log(offsetX);
                        ctrl_btn.css('left',offsetX+'px');

                    };

                // /ctrl_btn[0].click();
                document.body.removeEventListener('touchmove', move);
                document.body.removeEventListener('touchend',end);
                var move = function (evt) {
                    var cX = evt.touches[0].clientX-35,
                        offsetX = cX-oX;
                    console.log(offsetX);
                    setPercent(offsetX,allWidth);
                    oX = cX;
                };

                var end = function (evt) {
                    var left = ctrl_btn.css('left').slice(0,-2)* 1,
                        currentTime = left/allWidth*audio.duration;

                    audio.currentTime = ~~currentTime;
                };
                document.body.addEventListener('touchmove', move);
                document.body.addEventListener('touchend',end);
            });
        }
    };


    /*
    * 组建模板
    * */
    XAudio.prototype.getTpl = function () {
        var tpl = [];
        tpl.push("<div class=\"x_audio\" id=\""+this.id+"\">\n");
        tpl.push("<div class=\"left_icon\">\n");
        tpl.push("<span class=\"icon_audio\"></span>\n");
        tpl.push("</div>\n");
        tpl.push("<div class=\"right_progress\">\n");
        tpl.push("<div class=\"pro_bar\"></div>\n");
        tpl.push("<a href=\"javascript:void(0)\" class=\"__ctrl_btn play\"></a>\n");
        tpl.push("</div>\n");
        tpl.push("<div class=\"x_time\">\n");
        tpl.push("-<span class=\"__ctrl_time\">"+util.formatTime(0)+"</span>\n");
        tpl.push("</div>\n");
        tpl.push("</div>\n");

        return tpl.join('');
    };

    /*
    * 初始化组件
    * */
    XAudio.prototype.init = function (elem) {
        elem.append(this.getTpl());
        this.addEvent();
        return this;
    };

    XAudio.prototype.addEvent = function () {
        var context_id = '#'+this.id,
            c_btn = $(context_id+' .__ctrl_btn'),
            c_time = $(context_id+' .__ctrl_time'),
            c_bar = $(context_id+' .right_progress'),
            audio = this.audio;
        //console.log(audio.duration);
        /*
        * ---------------------------------------------
        *
        *  下面注释掉的地方在ios中无法触发这个事件，
        *  好特么神奇，到时候再研究研究
        *
        * ---------------------------------------------
        * */
        //this.audio.addEventListener('loadeddata',function(){
            //alert(1);
            //c_btn.bind('click', function () {
            //    if(!c_btn.hasClass('paused')){
            //        audio.play();
            //    }else{
            //        audio.pause();
            //    }
            //    c_btn.toggleClass('paused');
            //
            //});
            //c_btn[0].addEventListener('touchstart', function (evt) {
            //    alert('d');
            //    var oY = evt.touches[0].clientX;
            //    c_btn[0].addEventListener('touchend', function (evt) {
            //        var cY = evt.touches[0].clientX;
            //        if(Math.abs(cY-oY) < 10){
            //            alert('现在是点击');
            //        }
            //    });
            //});
            callback.canplay(audio,c_btn,c_bar,c_time);
            callback.touchDrag(audio,c_btn,c_bar,c_time);
        //});


    };

    return function (elem,src) {
        return new XAudio(elem,src);
    }
})(xQuery||jQuery);