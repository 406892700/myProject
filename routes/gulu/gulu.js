/**
 * Created by Administrator on 2015/11/23.
 */
module.exports = function(app){
    app.get('/bbs',function(req,res){
        res.render('html5/bbs/detail',{});
    });

    app.get('/bbs/getdata',function(req,res){
        var obj = {
            code:0,
            data:{
                a_id:12,//文章id
                a_author_id:12,//作者id
                a_type:'区角活动',//文章类别
                a_title:'我从未停止过，要成为一个坏人的决心',//文章标题
                a_media_type_name:'video',//pic,audio,vote//多媒体类别名称
                a_media_type:4,//多媒体类别id
                ifVoted:false,//是否投过票了
                a_media_data:{//类别数据(根据不同的类别来给不同的数据类型)
                    //音频
                    audioUrl:'/html5/audio/1.mp3',

                    //视频
                    videoUrl:'http://file.bmob.cn/M02/24/A0/oYYBAFaA3fqAGfZrAA-DvCSCS4g866.mp4',
                    videoPic:'/html5/bbs/images/video_bg.png',

                    //图片列表
                    imgList:['/html5/bbs/images/video_bg.png','/html5/bbs/images/video_bg.png','/html5/bbs/images/ranklist_bg.png','/html5/bbs/images/video_bg.png','/html5/bbs/images/ranklist_bg.png']
                },
                a_info:{//点赞。回复，浏览
                    like:1522,
                    reply:151,
                    view:1511
                },
                votes:[
                    {//投票（没投过都一样）
                        voteTheme:'孩子作业多好不好啊1？', //投票主体
                        voteAll:180,//所有选项总票数
                        voteItems:[
                            {id:12, value:30, content:'A 支持 孩子就要从小抓起'},
                            {id:14, value:60, content:'B 支持 孩子就要从小抓起'},
                            {id:13, value:90, content:'C 支持 孩子就要从小抓起'}
                        ]
                    },
                    {//投票（没投过都一样）
                        voteTheme:'孩子作业多好不好啊2？', //投票主体
                        voteAll:180,//所有选项总票数
                        voteItems:[
                            {id:15, value:30, content:'A 支持 孩子就要从小抓起'},
                            {id:24, value:60, content:'B 支持 孩子就要从小抓起'},
                            {id:53, value:90, content:'C 支持 孩子就要从小抓起'}
                        ]
                    },
                    {//投票（没投过都一样）
                        voteTheme:'孩子作业多好不好啊3？', //投票主体
                        voteAll:180,//所有选项总票数
                        voteItems:[
                            {id:82, value:30, content:'A 支持 孩子就要从小抓起'},
                            {id:114, value:60, content:'B 支持 孩子就要从小抓起'},
                            {id:193, value:90, content:'C 支持 孩子就要从小抓起'}
                        ]
                    }
                ],
                a_article:{//文章正文信息
                    a_content:'dsfsdsfd',//文章正文
                    author_info:{
                        name:'大海啊',
                        avatar:'/html5/bbs/images/useravatar.png',
                        time:'2011-11-11 11:11'
                    }
                },

                replys:[
                    {
                        id:12,//评论id
                        replyer_id:12,//回复者id
                        replyer:{//回复者信息
                            name:'大海啊',
                            avatar:'/html5/bbs/images/useravatar.png',
                        },
                        index:1,//多少多少楼
                        time:'2011-11-11 11:11',//回复时间
                        content:'cddsfssdf',//回复内容
                        toName:'呵呵'
                    },
                    {
                        id:15,//评论id
                        replyer_id:12,//回复者id
                        replyer:{//回复者信息
                            name:'大海啊',
                            avatar:'/html5/bbs/images/useravatar.png',
                        },
                        index:2,//多少多少楼
                        time:'2011-11-11 11:11',//回复时间
                        content:'cddsfssdf',//回复内容
                        toName:'呵呵'
                    },
                    {
                        id:1,//评论id
                        replyer_id:1,//回复者id
                        replyer:{//回复者信息
                            name:'大海啊',
                            avatar:'/html5/bbs/images/useravatar.png',
                        },
                        index:3,//多少多少楼
                        time:'2011-11-11 11:11',//回复时间
                        content:'cddsfssdf'//回复内容
                    }
                ]

            }
        };

        res.json(obj);
    });

    app.get('/api/vote',function(req,res){
        var obj = {
            code:0,
            data:[
                {//投票（没投过都一样）
                    voteTheme:'孩子作业多好不好啊1？', //投票主体
                    voteAll:180,//所有选项总票数
                    voteItems:[
                        {id:12, value:30, content:'A 支持 孩子就要从小抓起'},
                        {id:14, value:60, content:'B 支持 孩子就要从小抓起'},
                        {id:13, value:90, content:'C 支持 孩子就要从小抓起'}
                    ]
                },
                {//投票（没投过都一样）
                    voteTheme:'孩子作业多好不好啊2？', //投票主体
                    voteAll:180,//所有选项总票数
                    voteItems:[
                        {id:12, value:30, content:'A 支持 孩子就要从小抓起'},
                        {id:14, value:60, content:'B 支持 孩子就要从小抓起'},
                        {id:13, value:90, content:'C 支持 孩子就要从小抓起'}
                    ]
                },
                {//投票（没投过都一样）
                    voteTheme:'孩子作业多好不好啊3？', //投票主体
                    voteAll:180,//所有选项总票数
                    voteItems:[
                        {id:12, value:30, content:'A 支持 孩子就要从小抓起'},
                        {id:14, value:60, content:'B 支持 孩子就要从小抓起'},
                        {id:13, value:90, content:'C 支持 孩子就要从小抓起'}
                    ]
                }
            ]
        };

        res.json(obj);
    });

    app.get('/testMask',function(req,res){
        res.render('html5/bbs/testMask',{});
    });
};