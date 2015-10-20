var correctNum = 0,
    currentCountryIndex = 0,
    currentQAIndex = 0,
    delay1 = 3,
    delay2 = 10,
    timer,
    timer1,
    travel = (function(window,$,undefined){
    var randomIndex = function(arr){//随机置换数组元素的顺序
            var getRandomWithRange = function(end){
                var temp = [];
                while(temp.length < end){
                    var rdm = Math.floor(Math.random()*end);
                    if(temp.indexOf(rdm) == -1)
                        temp.push(rdm);
                }
                return temp;
            },
            tmp = getRandomWithRange(arr.length),
            tmp2 = [];

            for(var i in tmp){
                tmp2.push(arr[tmp[i]]);
            }

            return tmp2;
    },
    qa = [
        {
            countryName:'意大利',
            countryPic:'waibao/travel/js/italy.png',
            qes_ans:randomIndex([
                {question:'意大利国花是什么？',answers:['A 邹菊','B 郁金香'],trueIndex:0},
                {question:'拿破仑出生于哪个岛屿？',answers:['A 贝加莫','B 伦巴第'],trueIndex:0},
                {question:'意大利最大的岛屿？',answers:['A 西西里岛','B 撒丁岛'],trueIndex:0},
                {question:'西西里岛首府是什么城市？',answers:['A 利帕里','B 巴勒莫'],trueIndex:1},
                {question:'拿破仑出生于哪个岛屿？',answers:['A 科西嘉','B 卡普拉亚'],trueIndex:0},
                {question:'都灵冬奥会是哪一年？',answers:['A 2002年','B 2006年'],trueIndex:1},
                {question:'米兰世博会是哪一年？',answers:['A 2020年','B 2015年'],trueIndex:1},
                {question:'与意大利距离最近的北非国家是哪一个？',answers:['A 阿尔及利亚','B 突尼斯'],trueIndex:1},
                {question:'意大利和法国边境的勃朗峰，海拔多少？',answers:['A 4810米','B 5810米'],trueIndex:0},
                {question:'发生在意大利境内的第二次迦太基战争发生于哪一年？',answers:['A 公元前224年','B 公元前241年'],trueIndex:1},
                {question:'意大利的圣马可广场最大的特色什么？',answers:['A 鸽子','B 教堂'],trueIndex:0},
                {question:'意大利东边与巴尔干半岛之间的海是什么海？',answers:['A 亚得里亚海','B 爱琴海'],trueIndex:0},
                {question:'意大利第三大城市是什么？',answers:['A 都灵','B 那不勒斯'],trueIndex:0},
                {question:'传说中意大利来源于的创建者是一堆由母狼抚养的孪生，他们是：',answers:['A 罗慕路斯 雷哲德','B 雷穆斯   罗慕路斯'],trueIndex:1},
                {question:'《西西里的美丽传说》由意大利名模谁主演？',answers:['A 莫尼卡·贝鲁奇','B 玛琳娜·布雷托'],trueIndex:0},
                {question:'意大利最著名的火山是？',answers:['A 坎皮佛莱格瑞火山','B 维苏威火山'],trueIndex:1},
                {question:'意大利与斯洛文尼亚接壤有一个著名的城市，是？',answers:['A 的里雅斯特','B 摩纳奇'],trueIndex:0},
                {question:'撒丁岛上有一个意甲俱乐部，是哪个意甲队伍？',answers:['A 桑普多利亚队','B 卡利亚里'],trueIndex:0},
                {question:'先后担任过欧盟主席和意大利总理的是哪个人？',answers:['A 巴罗佐','B 普罗迪'],trueIndex:1},
                {question:'著名的古罗马哲学家皇帝是谁？',answers:['A 马可·奥勒留','B 朱庇特'],trueIndex:0},
                {question:'意甲球队拉齐奥队的标志是什么？',answers:['A 小雏鸡','B 绿头苍鹰'],trueIndex:0}

            ])
        },

        {
            countryName:'荷兰',
            countryPic:' waibao/travel/js/switzerland.png',
            qes_ans:randomIndex([
                {question:'荷兰本称？',answers:['A 尼德兰','B 拉德兰'],trueIndex:0},
                {question:'荷兰本土有多少个省？',answers:['A 24个','B 12个'],trueIndex:0},
                {question:'荷兰的著名汽车品牌是什么？',answers:['A 玛莎拉蒂','B 世爵'],trueIndex:1},
                {question:'荷兰的南边和哪个国家接壤？',answers:['A 比利时','B 德国'],trueIndex:0},
                {question:'荷兰的国歌是？',answers:['A 威廉颂','B 君主颂歌'],trueIndex:0},
                {question:'哪个机构的总部在荷兰海牙？',answers:['A WTO','B 国际法庭'],trueIndex:1},
                {question:'维多利亚女王皇冠上的钻石是在荷兰的哪一个钻石厂打磨出来的？',answers:['A 考斯特钻石厂','B 拉德维尔斯钻石厂'],trueIndex:0},
                {question:'荷兰的“豪达烛光之夜”是每年的什么时候？',answers:['A 12月12日','B 12月19日'],trueIndex:1},
                {question:'北海爵士音乐节每年在荷兰的哪个城市举办？',answers:['A 海牙','B 阿姆斯特丹'],trueIndex:0},
                {question:'2014年荷兰在FIFA中世界排名第几位？',answers:['A 3','B 5'],trueIndex:0},
                {question:'“荷兰四宝”之首是什么？',answers:['A 风车','B 木鞋'],trueIndex:1},
                {question:'“荷兰舞蹈节”中，哪一天会举办盛大的舞蹈大游行？',answers:['A 10月30日','B 9月30日'],trueIndex:0},
                {question:'荷兰队什么是合法的？',answers:['A 毒品','B 安乐死'],trueIndex:1},
                {question:'2015年世界500强企业中，有几家荷兰的企业？',answers:['A 13家','B 11家'],trueIndex:0},
                {question:'荷兰的"国王国会游行"日，是什么时候？',answers:['A 9月的第3个星期二','B 9月的第三个星期三'],trueIndex:0},
                {question:'荷兰的风车最早是从那国家引进的？',answers:['A 法国','B 德国'],trueIndex:1},
                {question:'荷兰最大的炼油中心是哪里？',answers:['A 鹿特丹','B 阿克苏'],trueIndex:0},
                {question:'荷兰被称为什么？',answers:['A 低洼之国','B 红鲱鱼之国'],trueIndex:0},
                {question:'荷兰的“水坝广场"建在哪条河上？',answers:['A 阿姆斯托河','B 库肯霍夫河'],trueIndex:0},
                {question:'奶酪是荷兰的“四宝”之一吗？',answers:['A 不是','B 是'],trueIndex:1},
                {question:'荷兰小吃“生吃鲱鱼”，一般搭配什么一起吃？',answers:['A 洋葱','B 醋'],trueIndex:0},
                {question:'小孩堤防拥有荷兰最大的风车系统，其共有多少架风车组成？',answers:['A 19架','B 29架'],trueIndex:0}

            ])
        },
        {
            countryName:'瑞士',
            countryPic:' waibao/travel/js/Belgium.png',
            qes_ans:randomIndex([
                {question:'瑞士共有几个州？',answers:['A 26个','B 38个'],trueIndex:0},
                {question:'瑞士被称为什么？',answers:['A 世界花园','B 世界公园'],trueIndex:1},
                {question:'瑞士联邦政府所在哪个城市？',answers:['A 伯尔尼','B 日内瓦'],trueIndex:0},
                {question:'瑞士最长的河流是哪一条？',answers:['A 莱茵河','B 罗桑河'],trueIndex:0},
                {question:'瑞士最大的城市是哪一个？',answers:['A 苏黎世','B 日内瓦'],trueIndex:0},
                {question:'瑞士人有哪个牛逼的科学发明？',answers:['A 电子显微镜','B 魔鬼毡'],trueIndex:1},
                {question:'瑞士最大的湖泊是哪一个？',answers:['A 莱蒙湖','B 瑞士湖'],trueIndex:0},
                {question:'以下哪个乐队是瑞士的？',answers:['A 班得瑞','B 神秘园'],trueIndex:0},
                {question:'洛迦诺国际电影节是瑞士举办的最早、最大的电影节，创办于？',answers:['A 1956年','B 1946年'],trueIndex:1},
                {question:'瑞士国土范围在史前是哪个人种的活动区域？',answers:['A 凯尔特人','B 日耳曼人'],trueIndex:0},
                {question:'瑞士的国歌最早在哪个音乐节上演出，大受欢迎？',answers:['A 日内瓦音乐节','B 苏黎世音乐节'],trueIndex:0},
                {question:'瑞士第一家孔子学院在哪里成立？',answers:['A 莱芒湖畔','B 柏迪丽湖畔'],trueIndex:1},
                {question:'1798年，拿破仑侵略瑞士，建立？',answers:['A 海地共和国','B 海尔维第共和国'],trueIndex:0},
                {question:'瑞士有几个机场？',answers:['A 3个','B 5个'],trueIndex:1},
                {question:'哪一种不是瑞士的官方语言？',answers:['A 英语','B 意大利语'],trueIndex:0},
                {question:'瑞士的国庆日是哪一天？',answers:['A 8月1日','B 9月1日'],trueIndex:0},
                {question:'瑞士人禁忌星期几？',answers:['A 星期三','B 星期五'],trueIndex:1},
                {question:'国际阿尔卑斯长号音乐节和比赛每年在瑞士的哪个地方举行？',answers:['A 南达镇','B 北达镇'],trueIndex:0},
                {question:'瑞士的著名景点“万国宫”位于哪里？',answers:['A 日内瓦','B 苏黎世'],trueIndex:1},
                {question:'因特拉肯是瑞士著名旅游景区，因为什么而出名？',answers:['A 少女峰','B 图恩湖'],trueIndex:0},
                {question:'米斯泰尔的本笃会圣约翰女修道院位于哪里？',answers:['A 格劳宾登','B B米斯泰尔'],trueIndex:0}
                
            ])

        },
        {
            countryName:'比利时',
            countryPic:'waibao/travel/js/netherland.png',
            qes_ans:randomIndex([
                {question:'比利时的首都是？',answers:['A 布鲁塞尔','B 布鲁日'],trueIndex:0},
                {question:'比利时的国鸟是？',answers:['A 红隼','B 苍鹰'],trueIndex:0},
                {question:'比利时漫画家埃尔热创作了？',answers:['A 丁丁历险记','B 大脸猫历险记'],trueIndex:0},
                {question:'比利时的独立日是哪一天？',answers:['A 11月4日','B 10月4日'],trueIndex:1},
                {question:'比利时最老的古城是？',answers:['A 布鲁日','B 安特卫普'],trueIndex:0},
                {question:'奥黛丽·赫本是比利时人，她曾担任哪个组织的大使？',answers:['A 联合国教科文组织','B 联合国儿童基金会'],trueIndex:1},
                {question:'詹姆斯·恩索被是比利时知名画家，被称为？',answers:['A 假面具画家','B 幻想曲画家'],trueIndex:0},
                {question:'比利时名菜淡菜配薯条的”淡菜“是一种？、',answers:['A 海鲜','B 菌类'],trueIndex:0},
                {question:'比利时最有名的海鲜是？',answers:['A 贻贝','B 花蛤'],trueIndex:0},
                {question:'比利时有几个省份？',answers:['A 9个','B 10个'],trueIndex:1},
                {question:'比利时画家老彼得·布吕赫尔被人称为？',answers:['A 农民画家','B 工人画家'],trueIndex:0},
                {question:'比利时拥有世界上最大的？',answers:['A 马铃薯加工基地','B 啤酒生产基地'],trueIndex:1},
                {question:'比利时在世界足球界中被称为？',answers:['A 万王之王','B 红魔'],trueIndex:1},
                {question:'获得诺贝尔文学奖的诺贝尔作家梅特林克的代表作是？',answers:['A 青鸟','B 囚鸟'],trueIndex:0},
                {question:'比利时的国花是？',answers:['A 虞美人','B 赛牡丹'],trueIndex:0},
                {question:'比利时的布拉邦特会在什么时候举办民间艺术节？',answers:['A 8月底','B 9月底'],trueIndex:1},
                {question:'SPA一词起源于比利时的？',answers:['A 一个小镇','B 一种技法'],trueIndex:0},
                {question:'比利时的什么东西，为全世界最多？',answers:['A 马铃薯','B 城堡'],trueIndex:1},
                {question:'著名的滑铁卢古战场位于比利时的哪个城市？',answers:['A 布鲁塞尔','B 布鲁日'],trueIndex:0}

            ])
        }
    ],

    
    
    getConutryIntro = function(index,delay,callback){// 获取国家介绍主页面html
        if(index >= qa.length){
            clearInterval(timer1);
            getRankPage();
            //alert('全答完了！');
            return;
        }
        var tpl = [],
            country = qa[index];
        callback = callback||function(){};

        currentQAIndex = 0;

        tpl.push('<div class="sec_wrap" style="display:none;">');
            tpl.push('<figure class="country_pic problem">');
                tpl.push('<img src="waibao/travel/js/fake_pic.png" class="fake_pic" id="fake_pic">');
                tpl.push('<img src="'+country.countryPic+'" alt="国家介绍" class="intro_pic" id="intro_pic">');
            tpl.push('</figure>');
            if(index == 0){
                tpl.push('<aside class="timeout">');
                    tpl.push('<div class="f_left" id="timeout1">');
                       tpl.push(delay);
                    tpl.push('</div>');
                    tpl.push('<div class="f_left">');
                        tpl.push('<img src="waibao/travel/js/tips.png" alt="">');
                    tpl.push('</div>');
                    tpl.push('<div class="clearfix"></div>');
                tpl.push('</aside>');
            }else{
                tpl.push('<div class="goon_btn">');
                tpl.push('<a href="javascript:void(0)" class="btn" onclick="travel.beiginExam('+index+','+delay+',\'waibao/travel/js/fake_1_2.png\');">继续</a>');
                tpl.push('<div class="result">你已经答对了'+correctNum+'题</div>');
            tpl.push('</div>');
            }
            
         tpl.push('</div>');

         $('#main_body').find('.sec_wrap').fadeOut(function(){
            $(this).remove();
            $(tpl.join('\n')).appendTo($('#main_body')).fadeIn();
            $('.e_header').removeClass('e_cover');
             var timeout = $('#timeout1'),
                intro_pic = $('#intro_pic');

            intro_pic[0].onload = function(){
                if(index != 0)
                    return;
                timer = setInterval(function(){
                    var seconds = timeout.text()*1;
                    if(seconds == 0){
                        clearInterval(timer);
                        travel.beiginExam(index,delay2,'waibao/travel/js/fake_1_2.png');
                    }else{
                        seconds--;
                        timeout.text(seconds);

                    }
                },1000);
            }
         });

    },

    beiginExam = function(index,duration,url){//开始测试
        var ques = qa[index].qes_ans[0],
            tpl = [];
            
        tpl.push('<div class="country_q_a">');
                tpl.push('<div class="question">');
                    tpl.push(''+ques.question+'');
                tpl.push('</div>');
                tpl.push('<div class="answer">');
                for(var i=0;i<ques.answers.length;i++){
                    if(i == ques.trueIndex)
                        tpl.push('<a href="javascript:void(0)" class="f_left" onclick="travel.getNextQA(true)">'+ques.answers[i]+'</a>');
                    else
                        tpl.push('<a href="javascript:void(0)" class="f_left" onclick="travel.getNextQA(false)">'+ques.answers[i]+'</a>');
                }
                    tpl.push('<div class="clearfix"></div>');
                tpl.push('</div> ');
            tpl.push('</div>');
         
            tpl.push('<div class="timeout2" id="timeout2">');
                tpl.push('<span>'+duration+'</span>');
                tpl.push('<div class="result">');
                    tpl.push('你已经答对了<span class="correctNum">'+correctNum+'</span>题');
                tpl.push('</div>');
            tpl.push('</div>');

        $('.timeout,.goon_btn').slideUp(function(){
            $(this).remove();
            $('.country_pic').slideUp(function(){
                $(this).find('#fake_pic').attr('src',url).end().slideDown();
                $(tpl.join('')).appendTo($('#main_body > .sec_wrap'));
                var timeout2 = $('#timeout2 > span');
                    timer1 = setInterval(function(){
                     var seconds = timeout2.text()*1;
                    if(seconds == 0){
                        clearInterval(timer1);
                        currentCountryIndex++;
                        getConutryIntro(currentCountryIndex,delay2);
                        // $('#main_body > .sec_wrap').fadeOut(function(){
                        //     $(this).empty();
                        //     getConutryIntro(currentCountryIndex,5);
                        // });
                    }else{
                        seconds--;
                        timeout2.text(seconds);

                    }
                },1000);

            });
        });
    },

    getNextQA = function(right){//获取下一题
        currentQAIndex++;
        var tpl = [],
            maxLength = qa[currentCountryIndex].qes_ans.length,
            ques = qa[currentCountryIndex].qes_ans[currentQAIndex];
            console.log(maxLength+','+currentQAIndex);
        if(currentQAIndex >= maxLength){
            clearInterval(timer1);
            currentCountryIndex++;
            getConutryIntro(currentCountryIndex,delay2);
            return;
        }

        if(right){
            correctNum++;
        }

        $('.timeout2 span.correctNum').text(correctNum);            
        tpl.push('<div class="question">');
                    tpl.push(''+ques.question+'');
               tpl.push('</div>');
               tpl.push('<div class="answer">');
                for(var i=0;i<ques.answers.length;i++){
                    if(i == ques.trueIndex)
                        tpl.push('<a href="javascript:void(0)" class="f_left" onclick="travel.getNextQA(true)">'+ques.answers[i]+'</a>');
                    else
                        tpl.push('<a href="javascript:void(0)" class="f_left" onclick="travel.getNextQA(false)">'+ques.answers[i]+'</a>');
                }
                    tpl.push('<div class="clearfix"></div>');
                tpl.push('</div> ');

        $(tpl.join('')).appendTo($('.country_q_a').empty());
    },

    getRankPage = function(){
        var tpl = [],
            rank = [
                {grade:1,rankName:'海淘小白白',between:[0,5],award:'再努力一下就能得到奖品啦！',icon:'waibao/travel/js/rank1.png'},
                {grade:2,rankName:'初级海淘喵',between:[6,10],award:'再努力一下就能得到奖品啦！',icon:'waibao/travel/js/rank2.png'},
                {grade:3,rankName:'资深海淘汪',between:[11,15],award:'恭喜你还将获得<br>网易考拉海购10元现金券一张',icon:'waibao/travel/js/rank3.png',href:'#1'},
                {grade:4,rankName:'海淘老司机',between:[16,20],award:'恭喜你还将获得<br>网易考拉海购30元现金券一张',icon:'waibao/travel/js/rank4.png',href:"#2"},
                {grade:5,rankName:'海淘剁手族',between:[21,25],award:'恭喜你还将获得<br>网易考拉海购60元现金券一张',icon:'waibao/travel/js/rank5.png',href:"#3"},
                {grade:6,rankName:'海淘党中央主席',between:[26,Number.POSITIVE_INFINITY],award:'恭喜您将获得<br>价值<span style="color:#fffb94">108</span>元的<br>网易考拉海购优惠券组合',icon:'waibao/travel/js/rank6.png',href:'#4'}
            ],
            ifIn = function(val,arr){
                if(arr[0] <= val && val <= arr[arr.length-1])
                    return true;
            },
            yourRank = (function(){
                for(var i in rank){
                    if(ifIn(correctNum,rank[i].between)){
                        return rank[i];
                    }
                }
            })();


        console.log(yourRank);

         tpl.push('<div class="rank_panel">');
                tpl.push('<figure>');
                    tpl.push('<img src="'+yourRank.icon+'" alt="海淘等级">');
                tpl.push('</figure>');
                tpl.push('<div class="rank_result">');
                    tpl.push('你一共答对了'+correctNum+'题<br>');
                    tpl.push('给你一枚'+yourRank.rankName+'勋章');
                tpl.push('</div>');
            tpl.push('</div>');
            tpl.push('<div class="result_explain">');
                tpl.push('<div class="title">');
                    tpl.push('<p>'+yourRank.award+'</p>');
                    if(yourRank.grade <= 2){
                        tpl.push('<div class="arrow_down"></div>');
                    }else{
                        tpl.push('<div class="line"></div>');
                    }
                tpl.push('</div>');
                tpl.push('<p>');
                    tpl.push('先分享到朋友圈<br>');
                    tpl.push('才能更加愉快滴领奖呢');
                tpl.push('</p>');
            tpl.push('</div>');
            tpl.push('<div class="some_operation">');
                tpl.push('<a href="javascript:void(0)" class="btn btn_share">分享到朋友圈</a>');
                tpl.push('<a href="javascript:void(0)" class="btn btn_repeat" onclick="window.location.reload()">重来一次</a>');
            tpl.push('</div>');

            
            $(tpl.join('')).appendTo($('#main_body > .sec_wrap').empty());
    };


    return {
        getConutryIntro:getConutryIntro,
        beiginExam:beiginExam,
        getNextQA:getNextQA
    }
})(window,$,undefined);


$(function(){
    $('#getStart').bind('click',function(){
        travel.getConutryIntro(0,delay1);
    });
});
