var laomei = (function(window,$,undefined){
    
    var 
        //提示框
        showTips = function(content,clickNone){
            var tpl = [],
                clickNone = (typeof clickNone == 'undefined')?(true):(clickNone);
                if($('.lm_mask').length >= 0){
                    $('.lm_mask').remove();
                }
            if(clickNone)
                tpl.push('<div class="lm_mask" style="display:none;" onclick="$(this).fadeOut(function(){$(this).remove()})">');
            else
                tpl.push('<div class="lm_mask" style="display:none;">');
                    tpl.push('<div class="content">'+content+'</div>');
                tpl.push('</div>');
                $(tpl.join('')).appendTo($('body')).fadeIn();

            return $('.lm_mask');
        },
        //提醒分享
        showMask = function(){
        var str = "<div style='left:0px;top:0px;z-index:9999;position:fixed;width:100%;height:100%;background-color:rgba(0,0,0,0.5);' onclick='$(this).fadeOut(function(){$(this).remove();})'><img width='100%' src='./images/mask_bg.png'></div>";
        $(str).appendTo($('body')).fadeIn();
    },
        // 获取抽奖页面
        getLottryPage = function(){
        var tpl = [],
            $container = $('#container');
        tpl.push('');
        tpl.push('<div class="inner_wrap" style="display:none">');
           tpl.push('<figure class="r_title">');
               tpl.push('<img src="./images/r_title.png" alt="">');
           tpl.push('</figure>');

           tpl.push('<div class="lottory_area">');
               tpl.push('<a href="javascript:void(0)" style="width:23%;left:15%;top:0%;"><img src="./images/m_c.png" alt=""></a>');
               tpl.push('<a href="javascript:void(0)" style="width:23%;right:15%;top:0%;"><img src="./images/m_j.png" alt=""></a>');
               tpl.push('<a href="javascript:void(0)" style="width:23%;left:5%;top:45%;"><img src="./images/m_k.png" alt=""></a>');
               tpl.push('<a href="javascript:void(0)" style="width:23%;right:5%;top:45%;"><img src="./images/m_a.png" alt=""></a>');
               tpl.push('<figure style="width:18%;left:29%;top:32%;"><img src="./images/i_cloud1.png" alt=""></figure>');
               tpl.push('<a href="javascript:void(0)" style="width:30%;left:35%;top:30%;"><img src="./images/m_women.png" alt=""></a>');
               tpl.push('<figure style="width:30%;left:48%;top:79%;"><img src="./images/i_cloud2.png" alt=""></figure>');
           tpl.push('</div>');
       tpl.push('</div>');

       $(tpl.join('')).appendTo($container.empty()).fadeIn();
       //执行一些事件的绑定
       (function(flag){
        $('.lottory_area > a').on('click',function lottry(){
            laomei.showTips('数据获取中..',false);
            $.ajax({
                // url:'/klactivity/getlottory',
                // 测试
                url:'',
                success:function(data){
                	// if(data.success){
                	// 	$('.lottory_area > a').off('click',lottry);
                 //        laomei.showTips('抽奖成功！').fadeOut(function(){
                 //            $(this).remove();
                 //        });
                 //        laomei.getResultPage(data.object); 
                	// }else{
                	// 	laomei.showTips('未知错误！').fadeOut(function(){
                 //            $(this).remove();
                 //        });
                	// }
                    
                    
                    laomei.showTips('抽奖成功！').fadeOut(function(){
                            $(this).remove(); 
                        });
                    laomei.getResultPage(); 
                },
                error:function(err){
                    laomei.showTips('数据获取错误！');
                }
            })
            
        });
       })(true);

    },
        getResultPage = function(rank){
            /*
            测试数据/／这个数据需要后台生成
             */

           rank = Math.floor(Math.random()*3);
            var ranks = [
                     /*泡面奖*/{rankIndex:0,ifAward:true,rankPic:'./images/r_rank1.png',rankExplain:'<p>你将获得网易考拉海购送出的</p><p class="huge">一整箱泡面</p><p>泡面的种类来自全国哦</p>'},
                     /*优惠券奖*/{rankIndex:1,ifAward:true,rankPic:'./images/r_rank2.png',rankExplain:'<p>你将获得网易考拉海购送出的</p><p class="huge">价值30元的吃货专享优惠券</p><p>赶紧领了去买买买吧！</p>'},
                     /*没有中奖*/{rankIndex:2,ifAward:false,rankPic:'./images/r_rank3.png',rankExplain:'<p>Sorry你没有中奖</p><p>分享到朋友圈，可以再来一次哦！</p>'}
                     ];
                tpl = [],
                myRank = ranks[rank],
                $container = $('#container');
            tpl.push('');
            tpl.push('<div class="inner_wrap">');
               tpl.push(' <figure style="padding:0px 20px;margin-top:30px;"><img src="'+myRank.rankPic+'" alt=""></figure>');
               tpl.push('<div class="r_explain">');
                   tpl.push(''+myRank.rankExplain+'');
               tpl.push('</div>');
               tpl.push('<div class="i_clouds">');
                   tpl.push('<figure style="width:25%;right:5%;"><img src="./images/i_cloud1.png" alt=""></figure>');
                   tpl.push('<figure style="width:35%;right:25%"><img src="./images/i_cloud2.png" alt=""></figure>');
               tpl.push('</div>');
               if(myRank.rankIndex == 0){
                tpl.push('<div class="btn_area">');
                   tpl.push('<a href="javascript:void(0)" class="btn" onclick="laomei.showMask()"><img src="./images/btn_share_now.png" alt=""></a>');
                   tpl.push('<a href="javascript:void(0)" onclick="laomei.getSubmitInfoPage()" class="btn"><img src="./images/btn_go_get.png" alt=""></a>');
               tpl.push('</div>');
               }else if(myRank.rankIndex == 1){
                    tpl.push('<div class="btn_area">');
                       tpl.push('<a href="javascript:void(0)" class="btn" onclick="laomei.showMask()"><img src="./images/btn_share_now.png" alt=""></a>');
                       tpl.push('<a href="" class="btn"><img src="./images/btn_go_get1.png" alt=""></a>');
                   tpl.push('</div>');
                    
               }else{
                    tpl.push('<div class="btn_area">');
                       tpl.push('<a href="javascript:void(0)" class="btn" onclick="laomei.showMask()"><img src="./images/btn_share_now.png" alt=""></a>');
                       tpl.push('<a href="javascript:void(0)" class="btn" onclick="window.location.reload()"><img src="./images/btn_click_repeat.png" alt=""></a>');
                       tpl.push('<a href="" class="btn"><img src="./images/btn_buy_now.png" alt=""></a>');
                   tpl.push('</div>');
               }

               tpl.push('<p class="r_explain1">');
                   tpl.push('分享后才能更愉快滴领奖品哦！');
               tpl.push('</p>');
           tpl.push('</div>');

           $(tpl.join('')).appendTo($container.empty()).fadeIn();
    },
        getSubmitInfoPage = function(){
            var tpl = [];
            tpl.push('');
            tpl.push('<div class="inner_wrap">');
               tpl.push('<form style="margin-top:40px;">');
                   tpl.push('<div class="form_group">');
                       tpl.push('<label for="name">');
                           tpl.push('<img src="./images/t_name.png" alt="">');
                       tpl.push('</label>');
                       tpl.push('<div class="form_control">');
                           tpl.push('<input type="text" id="name" name="name">');
                       tpl.push('</div>');
                       tpl.push('<div class="clearfix"></div>');
                   tpl.push('</div>');
                   tpl.push('<div class="form_group">');
                       tpl.push('<label for="name">');
                           tpl.push('<img src="./images/t_phone.png" alt="">');
                       tpl.push('</label>');
                       tpl.push('<div class="form_control">');
                           tpl.push('<input type="text" id="phone" name="phone">  '); 
                       tpl.push('</div>');
                       tpl.push('<div class="clearfix"></div>');
                   tpl.push('</div>');
                   tpl.push('<div class="form_group">');
                       tpl.push('<label for="name">');
                           tpl.push('<img src="./images/t_address.png" alt="">');
                       tpl.push('</label>');
                       tpl.push('<div class="form_control" style="height:80px;">');
                           tpl.push('<textarea name="" id="" cols="30" rows="10" id="address" name="address"></textarea>');
                       tpl.push('</div>');
                       tpl.push('<div class="clearfix"></div>');
                   tpl.push('</div>');
               tpl.push('</form>');
               tpl.push('<div class="i_clouds">');
                   tpl.push('<figure style="width:25%;right:5%;"><img src="./images/i_cloud1.png" alt=""></figure>');
                   tpl.push('<figure style="width:35%;right:25%"><img src="./images/i_cloud2.png" alt=""></figure>');
               tpl.push('</div>');
               tpl.push('<div class="btn_area" style="margin-bottom:40px;">');
                   tpl.push('<a href="javascript:void(0)" class="btn" id="btn_submit"><img src="./images/btn_complete.png" alt=""></a>');
                   tpl.push('<a href="javascript:void(0)" class="btn"><img src="./images/btn_share_friend.png" alt=""></a>');
                   tpl.push('<a href="javascript:void(0)" class="btn"><img src="./images/btn_click_me.png" alt=""></a>');
               tpl.push('</div>');
           tpl.push('</div>');
           $(tpl.join('')).appendTo($container.empty()).fadeIn();
           
           $('#btn_submit').click(function(){
        	   var $name = $('#name'),
        	   	   $phone = $('#phone'),
        	   	   $address = $('#address');
        	   
//        	   只做三个空值判断
        	   if($name.val() == ''){
        		   laomei.showTips('姓名不能为空');
        		   return;
        	   }
        	   
        	   if($phone.val() == ''){
        		   laomei.showTips('电话不能为空');
        		   return;
        	   }
        	   
        	   if($address.val() == ''){
        		   laomei.showTips('地址不能为空');
        		   return;
        	   }
        	   
        	   $.ajax({
        		   url:'/klactivity/lucky',
        		   type:'post',
        		   success:function(data){
        			   if(data.success){
        				   laomei.showTips('提交成功！');
        				   window.location.reload();
        			   }else{
        				   laomei.showTips('提交失败！');
        			   }
        		   },
        		   error:function(err){
        			   laomei.showTips('数据获取错误！');
        		   }
        	   })
           });
    };
    

    return {
        getLottryPage:getLottryPage,
        getResultPage:getResultPage,
        getSubmitInfoPage:getSubmitInfoPage,
        showTips:showTips,
        showMask:showMask
    }
})(window,jQuery,undefined);

$(function(){

});