/**
 * Created by Administrator on 2016/3/3.
 */
var BBS = (function(){
    var util = {
            handleAjax : function(data,callback,callback1){
                callback1 = callback1 || function(){};
                if(data.code*1 === 0){
                    callback(data.result);
                }else{
                    alert(data.errmsg);
                    callback1();
                }
            },
            errAlert : function(text){
                $.Alert('网络错误，请重试~');
            },
            getQueryField : function(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null)
                    return unescape(r[2]);
                return null;
            }
        },
        args = {
            uid : util.getQueryField('uid'),
            accesstoken : util.getQueryField('accesstoken')
        };

    /*初始化详情页面*/
    var initPage = function(){
        $.ajax({
            async:false,
            url:'/bbs/getdata',
            data:{
                tid:1
            },
            success:function(data){
                util.handleAjax(data,function(data){
                    renderData(data);
                });
            },
            error: function (err) {
                util.errAlert();
            }
        })
    };

    /*跳到顶部*/
    var goTop = function($obj){
        var oY = 0,
            jumpTop = function(){
                document.body.scrollTop = 0;
            };
        $obj.bind('click',jumpTop);

        $(window).scroll(function(evt){
            var cY = $(this).scrollTop();
            if(cY-oY > 0){
                $obj.addClass('actived');
            }else{
                $obj.removeClass('actived');
            }
            oY = cY;

        });
    };

    /*初始化顶部*/
    var renderTop = function (data,$wrapTop) {
        var tpl = [];
        tpl.push('');
        tpl.push('<header class="articleInfo">');
        tpl.push('<h2>');
        tpl.push('<span class="articleType">['+data.a_type+']</span>');
        tpl.push(data.a_title);
        tpl.push('<span class="iconType '+data.a_media_type_name+'"></span>');
        tpl.push('</h2>');
        tpl.push('</header>');
        tpl.push('<!-- 贴子标题-->');
        tpl.push('<section class="articleInfo">');
        tpl.push('<ul class="clearfix1">');
        tpl.push('<li><em class="iconType like"></em> '+data.a_info.like+'</li>');
        tpl.push('<li><em class="iconType reply"></em> '+data.a_info.reply+'</li>');
        tpl.push('<li><em class="iconType view"></em> '+data.a_info.view+'</li>');
        tpl.push('</ul>');
        tpl.push('</section>');
        tpl.push('<!-- 贴子浏览信息-->');

        $wrapTop.append(tpl.join('\n'));
    };

    /*初始化内容区块*/
    var renderContent = function (data,$wrapContent) {
        var tpl = [];
        tpl.push("<section class=\"articleSec\">\n");
        tpl.push("<header class=\"userInfo clearfix1\">\n");
        tpl.push("<div class=\"userAvatar\">\n");
        tpl.push("<img src=\""+data.a_article.author_info.avatar+"\" alt=\""+data.a_article.author_info.name+"\"/>\n");
        tpl.push("</div>\n");
        tpl.push("<div class=\"rightPt\">\n");
        tpl.push("<p class=\"userName\">\n");
        tpl.push(""+data.a_article.author_info.name+"\n");
        tpl.push("<span class=\"tagAuthor\">楼主</span>\n");
        tpl.push("</p>\n");
        tpl.push("<p class=\"publishTime\">\n");
        tpl.push(""+data.a_article.author_info.time+"\n");
        tpl.push("</p>\n");
        tpl.push("</div>\n");
        tpl.push("</header>\n");
        tpl.push("<div class=\"articleContent\">\n");
        tpl.push("<div class=\"typeWrap\"></div>");
        tpl.push(""+data.a_article.a_content+"");
        tpl.push("<div class=\"typeWrap\"></div>");
        tpl.push("<div class=\"voteWrap\"></div>");
        tpl.push("</div>\n");
        tpl.push("</div>\n");
        tpl.push("</section>\n");
        tpl.push("<!-- 贴子正文-->\n");
        tpl.push("\n");

        var mediaObj = {
            //1文字，2图文，3音频，4视频，5投票
            1: {
                callback: function (data) {//纯文字 什么都不做
                    return false;
                },
                position:0
            },
            2:{
                callback:function (data,$wrap) {//图片
                    var imgList = data.imgList,
                        imgTpl = [],
                        getOriginalImg = function (path) {
                            return path.replace('_thumb','');
                        },
                        className = imgList.length > 2 ? 'amount3' : 'amount12';
                    imgTpl.push("<div class=\"typePic "+className+"\">\n");
                    for(var i=0,length = imgList.length;i<length;i++){
                        var originImg = getOriginalImg(imgList[i]);
                        imgTpl.push("<a href=\"javascript:void(0)\" data-original=\""+originImg+"\">\n");
                        var imgSrc = length > 2 ? imgList[i] : originImg;
                        imgTpl.push('<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5ODUxNDdBRTI1QjlFNTExQkIxQkVBOTIwQjFCQkIyNyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDMEEwQzcwM0UyQzUxMUU1OTMwNEE4QUMxRTJFQkNEOSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDMEEwQzcwMkUyQzUxMUU1OTMwNEE4QUMxRTJFQkNEOSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjUyQzFDQjRBOTJDOUU1MTE5RDg3OUUzMkY2ODNEQjA2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjk4NTE0N0FFMjVCOUU1MTFCQjFCRUE5MjBCMUJCQjI3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+sZTm8AAAAA9JREFUeNpi+P//P0CAAQAF/gL+Lc6J7gAAAABJRU5ErkJggg==">')
                        imgTpl.push("<img src=\""+imgSrc+"\" alt=\"\"/ class=\"real\">\n");
                        imgTpl.push("</a>\n");
                        imgTpl.push("\n");
                    }
                    imgTpl.push("</div>\n");

                    $wrap.append(imgTpl.join(''));

                    $wrap.find('.typePic > a').bind('click', function () {
                            var img = new Image(),
                                timeStamp = +new Date();

                        img.src = $(this).data('original');
                        $(img).bind('load',function(){
                            var height = $(this)[0].height,
                                width = $(this)[0].width,
                                viewportHeight = $(window).height(),
                                viewportWidth = $(window).width(),
                                cHeight = height*viewportWidth/width,

                                offsetTop = (viewportHeight-cHeight)/2;
                            offsetTop = offsetTop < 0 ? 0 : offsetTop;

                            $(this).css('margin-top',offsetTop+'px');

                            $('#'+timeStamp).empty().append($(this));
                        });
                        var preViewStr = '<div class="bbs_mask" onclick="$(this).remove()"><div id="'+timeStamp+'" class="inner_wrap"><div class="loading"></div></div></div>';

                        $('body').append(preViewStr);
                    });
                },
                position:0
            },
            3: {
                callback:function (data,$wrap) {//音频
                    xAudio(data.audioUrl,$wrap);
                },
                position:0
            },
            4: {
                callback: function (data, $wrap) {//视频
                    var videoTpl = [];
                    videoTpl.push('<div class="typeVideo">');
                    var viewportWidth = $(window).width(),
                        rate = 9 / 16,
                        videoHeight = viewportWidth * rate;
                    videoTpl.push('<video src="' + data.videoUrl + '" controls="controls" height="' + videoHeight + '"></video>');
                    videoTpl.push('<img src="/html5/bbs/images/bbs_video_pic.png" alt="" width="100%" height="100%"/ class="videoPic">');
                    videoTpl.push('<a href="javascript:void(0)" class="playBtn" data-url="' + data.videoUrl + '"></a>');
                    videoTpl.push('</div>');
                    $wrap.append(videoTpl.join(''));
                    $wrap.find('.playBtn').bind('click', function () {
                        //判断平台及版本，进行相应的操作
                        var $typeVideo = $('.typeVideo'),
                            $video = $typeVideo.find('video'),
                            $img = $typeVideo.find('.videoPic'),
                            $this = $(this),
                            getBrowerInfo = function () {
                                var ua = window.navigator.userAgent;
                                if (ua.indexOf('gulu') === -1) {
                                    return null;
                                }

                                var uaArr = ua.split('/');
                                obj = {};
                                obj.platform = uaArr[1].toLowerCase();
                                obj.version = uaArr[2].replace(/\./g, '') * 1;

                                return obj;
                            },
                            appInfo = getBrowerInfo();

                        if (!appInfo) {//如果是在外部浏览器或者ios设备中打开了
                            //直接播放
                            $video[0].play();
                            if (navigator.appVersion.indexOf('Android') !== -1) {
                                $img.css('display', 'none');
                                $this.css('display', 'none');
                                return;
                            }
                            $this.addClass('loading');
                            setTimeout(function () {
                                $this.removeClass('loading');
                            }, 1500);

                        } else if (appInfo.platform == 'ios') {//app中的ios
                            $this.addClass('loading');
                            setTimeout(function () {
                                $this.removeClass('loading');
                            }, 1500);
                        } else {//否则就是在app安卓中打开了
                            //调用安卓的播放器来播放
                            if (info.version <= 183) {//版本小于183的提示去升级
                                $.Alert('您的app版本过低,建议您先至首页升级您的app');
                                return;
                            }

                            window.location.href = "/WEBTAG_TO_VIDEO?title=" + $('title').text() + "&url=" + $video[0].src + "";
                        }
                    });
                },
                position: 0
            }
            //},
            //5: {
            //    callback:,
            //    position:1
            //}

        };

        $wrapContent.append(tpl.join('\n'));
        mediaObj[data.a_media_type].callback(data.a_media_data,$wrapContent.find('.typeWrap').eq(mediaObj[data.a_media_type].position));
        renderVote(data.votes,data.ifVoted,$wrapContent.find('.voteWrap'));
    };

    /*
    * @param data 投票数据
    * @param flag 是否投过票
    * @param $wrap 外容器
    * */
    var renderVote = function (data,flag,$wrap) {//投票
        if(!data || !data.length)return;
        var voteTpl = [],
            showResult = function(data,$wrap){
                console.log(data);
                var voteTpl2 = [];
                voteTpl2.push('<div class="typeVote">');
                $(data).each(function(index,v){
                    voteTpl2.push('<div class="voteContent">');
                    voteTpl2.push('<div class="title">');
                    voteTpl2.push(''+v.voteTheme+'');
                    voteTpl2.push('</div>');
                    voteTpl2.push('<ol>');
                    for(var j = 0,length2 = v.voteItems.length;j<length2;j++){
                        voteTpl2.push('<li class="clearfix1">');
                        voteTpl2.push('<div class="rightPt">'+v.voteItems[j].value+'票</div>');
                        voteTpl2.push('<div class="leftPt">');
                        voteTpl2.push('<div class="progress">');
                        var percent = v.voteItems[j].value*1/v.voteAll*100+'%';
                        voteTpl2.push('<div class="percent" style="width:'+percent+'"></div>');
                        voteTpl2.push('</div>');
                        voteTpl2.push('<p>'+v.voteItems[j].content+'</p>');
                        voteTpl2.push('</div>');
                        voteTpl2.push('</li>');
                    }
                    voteTpl2.push('</ol>');
                    voteTpl2.push('</div>');

                });
                voteTpl2.push('</div>');
                $wrap.append(voteTpl2.join('\n'));

            };
        if(!flag && args.uid){//没投票
            voteTpl.push('<div class="typeVote">');
            $(data).each(function(index,v){
                voteTpl.push('<div class="voteContent" data-vote-all="'+v.voteAll+'" data-single="'+ v.single+'"> ');
                voteTpl.push('<div class="title">');
                var typeName = v.single ? '单选' : '多选';
                voteTpl.push(v.voteTheme+'('+typeName+')');
                voteTpl.push('</div>');
                voteTpl.push('<ol>');
                for(var i = 0,length = v.voteItems.length;i<length;i++){
                    voteTpl.push('<li data-id="'+v.voteItems[i].id+'" data-value="'+v.voteItems[i].value+'"><a href="javascript:void(0)" class="checkbox"></a>'+v.voteItems[i].content+'</li>');
                }
                voteTpl.push('</ol>');
                voteTpl.push('</div>');
            });

            voteTpl.push('<div class="btnArea">');
            voteTpl.push('<a href="javascript:void(0)" class="submitVote">提交</a>');
            voteTpl.push('</div>');
            voteTpl.push('</div>');

            $wrap.append(voteTpl.join(''));

            $wrap.find('li').bind('click',function(){
                var single =  $(this).closest('.voteContent').data('single');

                if(single){
                    $(this).siblings('li.checked').removeClass('checked');
                    $(this).addClass('checked');
                }else{
                    $(this).toggleClass('checked');
                }

            });
            //
            $wrap.find('.btnArea').bind('click',function(){
                var $this = $(this),
                    voteItemNum = $('.voteContent'),
                    ids = [].map.call($wrap.find('li.checked'),function(v,i){
                        return $(v).data('id');
                    });
                for(var j = 0;j<voteItemNum.length;j++){
                    if(voteItemNum.eq(j).find('.checked').length === 0){
                        $.Alert('您还没有全部投完哦~');
                        return;
                    }
                }
                //if(ids.length < voteItemNum){
                //    $.Alert('您还没有全部投完哦~');
                //    return;
                //}

                if($this.hasClass('disabeld')){
                    return;
                }
                $this.addClass('disabeld');
                $.ajax({
                    url:'/api/vote',
                    data:{
                        id:JSON.stringify(ids)
                    },
                    success: function (data) {
                        $this.removeClass('disabeld');
                        util.handleAjax(data,function(data){
                            $wrap.empty();
                            console.log(data);
                            showResult(data,$wrap);
                        });
                    },
                    error: function (err) {
                        util.errAlert();
                    }
                });
            });
        }else{
            showResult(data,$wrap);
        }

    };

    /*获取评论模板*/
    var getReplyTpl = function(data){
        var replyTpl = [],
            replys = data;
        replyTpl.push("<ul>\n");

        for(var i = 0,length = replys.length;i<length;i++){
            replyTpl.push("<li id=\"reply_"+replys[i].id+"\">\n");
            replyTpl.push("<div class=\"clearfix1\">\n");
            replyTpl.push("<aside class=\"operation\">\n");
            if(args.uid == replys[i].replyer_id){
                replyTpl.push("<a href=\"javascript:void(0)\" data-id=\""+replys[i].id+"\" class=\"iconOp delete\"></a>\n");
            }
            if(args.uid){
                replyTpl.push("<a href=\"javascript:void(0)\" data-id=\""+replys[i].id+"\" class=\"iconOp reply\"></a>\n");
            }
            replyTpl.push("</aside>\n");
            replyTpl.push("<div class=\"userAvatar\">\n");
            replyTpl.push("<img src=\""+replys[i].replyer.avatar+"\" alt=\"\"/>\n");
            replyTpl.push("</div>\n");
            replyTpl.push("<div class=\"replyItem\">\n");
            replyTpl.push("<p class=\"userName\">"+replys[i].replyer.name+"</p>\n");
            replyTpl.push("<p class=\"reply_info\">\n");
            replyTpl.push(""+replys[i].index+"楼\n");
            replyTpl.push("<span class=\"time\">\n");
            replyTpl.push(""+replys[i].time+"\n");
            replyTpl.push("</span>\n");
            replyTpl.push("</p>\n");
            replyTpl.push("<p class=\"replyContent\">\n");
            if(replys[i].toName){
                replyTpl.push("<span class=\"replyTo\">@ "+replys[i].toName+"</span>");
            }
            replyTpl.push(""+replys[i].content+"\n");
            replyTpl.push("</p>\n");
            replyTpl.push("</div>\n");
            replyTpl.push("</div>\n");
            replyTpl.push("</li>\n");
            replyTpl.push("<!-- 评论-->\n");
        }

        replyTpl.push("</ul>\n");

        return replyTpl.join('');
    };

    /*绑定删除评论事件*/
    var bindReplyEvent = function(){
        $('.replySec').on('click','.iconOp.delete',function(){
            var reply_id = $(this).data('id'),
                $replyItem = $('#reply_'+reply_id),
                viewportWidth = $(window).width(),
                deletefunc = function(){
                    $.ajax({
                        url:'/delReply',
                        data:{
                            id:reply_id
                        },
                        success:function(data){
                            util.handleAjax(data,function(data){
                                $replyItem.find('.clearfix1')
                                    .animate({'-webkit-transform':'translateX(-'+viewportWidth+'px)','transform':'translateX(-'+viewportWidth+'px)'},
                                    1000,
                                    'ease-in-out',
                                    function(){
                                        $replyItem.remove();
                                    });
                            });

                        },
                        error:function(err){
                            util.errAlert();
                        }
                    })
                };
            $.Confirm('确定删除此条评论？',{doneText:'删除',doneCallback:deletefunc})
        });
    };

    /*放入模板*/
    var renderReply = function (data,$wrapReply) {
        var replyTpl = [];
        replyTpl.push("<section class=\"replySec\">\n");
        replyTpl.push(getReplyTpl(data.replys));
        replyTpl.push("<div class=\"allReplyItem\">\n");
        replyTpl.push("已有 <span class=\"pink\">"+data.a_info.reply+"</span>人跟帖\n");
        replyTpl.push("<a href=\"/allreply?uid="+args.uid+"&accesstoken="+args.accesstoken+"\" class=\"lookMoreReply\">查看更多评论 &gt;</a>\n");
        replyTpl.push("</div>\n");
        replyTpl.push("</section>\n");
        replyTpl.push("<!-- 回复区域-->\n");
        $wrapReply.append(replyTpl.join(''));
        bindReplyEvent();
    };

    /*数据与模板拼接*/
    var renderData = function (data) {
        FastClick.attach(document.body);
        renderTop(data,$('#top'));
        renderContent(data,$('#content'));
        renderReply(data,$('#reply'));
        goTop($('.goTop'));
    };

    var lastId = 0,
        count = 0;
    /*评论页获取模板*/
    var getReply = function(id){
        id = id || 0;
        var tid = util.getQueryField('tid'),
            ifEnd = false;

        $.ajax({
            url:'/getReply?count='+(count++),
            data:{
                tid:tid,
                id:id
            },
            async:false,
            success: function (data) {
                util.handleAjax(data,function(data){
                    if(!data.length) {
                        ifEnd = true;
                        return;
                    }
                    $('#reply').append(getReplyTpl(data));
                    lastId = data[data.length-1].id;
                });
            },
            error: function (err) {
                util.errAlert();
            }
        });

        return ifEnd;

    };


    /*初始化回复页面*/
    var initReply = function(){
        FastClick.attach(document.body);
        getReply();
        bindReplyEvent();
        goTop($('.goTop'));
        lazyFlush($('.flush_loading'),$('.no_more'));
    };

    /*下拉加载*/
    var lazyFlush = function($flush,$noMore){
        var load = function(){
            if($(document).height()-$(window).scrollTop()-$(window).height() <= 10){
                var ifEnd = getReply(lastId);
                if(ifEnd){
                    $(window).unbind('scroll',load);
                    $flush.css('display','none');
                    $noMore.css('display','block');
                    return;
                }
                $(window).unbind('scroll',load);
                setTimeout(function(){
                    $(window).bind('scroll',load);
                },50);
            }

        };

        $(window).bind('scroll',load);
    };

    return {
        initPage:initPage,
        initReply:initReply
    }
})($);
