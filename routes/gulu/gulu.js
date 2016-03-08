/**
 * Created by Administrator on 2015/11/23.
 */
module.exports = function(app){
    app.get('/bbs',function(req,res){
        res.render('html5/bbs/detail',{});
    });

    app.get('/bbs/getdata',function(req,res){

        var obj = {
            code: "0",
            errmsg: "",
            result: {
                a_article: {
                    a_content: "<p>se<br/></p>",
                    author_info: {
                        avatar: "http://pay.gulubaobao.com/images/ic_launcher_small.png",
                        name: "软软爷爷",
                        time: "2016-03-03 19:00:49"
                    }
                },
                a_author_id: "125968",
                a_id: "6",
                a_info: {
                    like: "3",
                    reply: "2",
                    view: "7"
                },
                a_media_data: {
                    imgList: [
                        "http://192.168.1.3/upload/other/2016/03/03/81D723E3E7FE408484A1BDED2E3C8ED8_100_100.png"
                    ]
                },
                a_media_type: "2",
                a_media_type_name: "vote",
                a_title: "sss",
                a_type: "活动",
                ifVoted: false,
                replys: [
                    {
                        content: "呵呵呵，",
                        id: "4",
                        index: "1",
                        replyer: {
                            avatar: "http://pay.gulubaobao.com/images/ic_launcher_small.png",
                            name: "软软爷爷"
                        },
                        replyer_id: "125968",
                        time: "2016-03-08 14:10:24",
                        toName: "软软爷爷"
                    },
                    {
                        content: "999",
                        id: "3",
                        index: "2",
                        replyer: {
                            avatar: "http://pay.gulubaobao.com/images/ic_launcher_small.png",
                            name: "软软爷爷"
                        },
                        replyer_id: "125968",
                        time: "2016-03-08 14:09:58",
                        toName: "软软爷爷"
                    },
                    {
                        content: "555",
                        id: "2",
                        index: "3",
                        replyer: {
                            avatar: "http://pay.gulubaobao.com/images/ic_launcher_small.png",
                            name: "软软爷爷"
                        },
                        replyer_id: "125968",
                        time: "2016-03-08 14:09:41",
                        toName: ""
                    }
                ],
                votes: [
                    {
                        single: true,
                        voteAll: "11",
                        voteItems: [
                            {
                                content: "1 哈搜",
                                id: "3",
                                value: "1"
                            },
                            {
                                content: "2 dd",
                                id: "4",
                                value: "5"
                            }
                        ],
                        voteTheme: "补补订单"
                    },
                    {
                        single: false,
                        voteAll: "11",
                        voteItems: [
                            {
                                content: "1 哈搜",
                                id: "3",
                                value: "1"
                            },
                            {
                                content: "2 dd",
                                id: "4",
                                value: "5"
                            }
                        ],
                        voteTheme: "补补订单"
                    }
                ]
            }
        };

        res.json(obj);
    });

    app.get('/api/vote',function(req,res){
        var obj = {
            code:0,
            result:[
                {
                    single: true,
                    voteAll: "11",
                    voteItems: [
                        {
                            content: "1 哈搜",
                            id: "3",
                            value: "1"
                        },
                        {
                            content: "2 dd",
                            id: "4",
                            value: "5"
                        }
                    ],
                    voteTheme: "补补订单"
                },
                {
                    single: false,
                    voteAll: "11",
                    voteItems: [
                        {
                            content: "1 哈搜",
                            id: "3",
                            value: "1"
                        },
                        {
                            content: "2 dd",
                            id: "4",
                            value: "5"
                        }
                    ],
                    voteTheme: "补补订单"
                }
            ]
        };

        res.json(obj);
    });

    app.get('/testMask',function(req,res){
        res.render('html5/bbs/testMask',{});
    });

    app.get('/allreply', function (req, res) {
        res.render('html5/bbs/reply',{});
    });

    app.get('/getReply', function (req, res) {
        var count = req.query.count, obj ={};
        console.log(count);
        if(count >= 5){
            obj = {
                code:0,
                errmsg:'',
                result:[]
            }
        }else{
            obj = {
                code:0,
                errmsg:'',
                result:[
                    {
                        content: "呵呵呵",
                        id: "4",
                        index: "1",
                        replyer: {
                            avatar: "http://pay.gulubaobao.com/images/ic_launcher_small.png",
                            name: "软软爷爷"
                        },
                        replyer_id: "125968",
                        time: "2016-03-08 14:10:24",
                        toName: "软软爷爷"
                    },
                    {
                        content: "呵呵呵",
                        id: "4",
                        index: "1",
                        replyer: {
                            avatar: "http://pay.gulubaobao.com/images/ic_launcher_small.png",
                            name: "软软爷爷"
                        },
                        replyer_id: "125968",
                        time: "2016-03-08 14:10:24",
                        toName: "软软爷爷"
                    },
                    {
                        content: "呵呵呵",
                        id: "4",
                        index: "1",
                        replyer: {
                            avatar: "http://pay.gulubaobao.com/images/ic_launcher_small.png",
                            name: "软软爷爷"
                        },
                        replyer_id: "125968",
                        time: "2016-03-08 14:10:24",
                        toName: "软软爷爷"
                    },
                    {
                        content: "呵呵呵",
                        id: "4",
                        index: "1",
                        replyer: {
                            avatar: "http://pay.gulubaobao.com/images/ic_launcher_small.png",
                            name: "软软爷爷"
                        },
                        replyer_id: "125968",
                        time: "2016-03-08 14:10:24",
                        toName: "软软爷爷"
                    },
                    {
                        content: "呵呵呵",
                        id: "4",
                        index: "1",
                        replyer: {
                            avatar: "http://pay.gulubaobao.com/images/ic_launcher_small.png",
                            name: "软软爷爷"
                        },
                        replyer_id: "125968",
                        time: "2016-03-08 14:10:24",
                        toName: "软软爷爷"
                    },
                    {
                        content: "呵呵呵",
                        id: "4",
                        index: "1",
                        replyer: {
                            avatar: "http://pay.gulubaobao.com/images/ic_launcher_small.png",
                            name: "软软爷爷"
                        },
                        replyer_id: "125968",
                        time: "2016-03-08 14:10:24",
                        toName: "软软爷爷"
                    },
                    {
                        content: "呵呵呵",
                        id: "4",
                        index: "1",
                        replyer: {
                            avatar: "http://pay.gulubaobao.com/images/ic_launcher_small.png",
                            name: "软软爷爷"
                        },
                        replyer_id: "125968",
                        time: "2016-03-08 14:10:24",
                        toName: "软软爷爷"
                    },
                    {
                        content: "呵呵呵",
                        id: "4",
                        index: "1",
                        replyer: {
                            avatar: "http://pay.gulubaobao.com/images/ic_launcher_small.png",
                            name: "软软爷爷"
                        },
                        replyer_id: "125968",
                        time: "2016-03-08 14:10:24",
                        toName: "软软爷爷"
                    },
                    {
                        content: "999",
                        id: "3",
                        index: "2",
                        replyer: {
                            avatar: "http://pay.gulubaobao.com/images/ic_launcher_small.png",
                            name: "软软爷爷"
                        },
                        replyer_id: "125968",
                        time: "2016-03-08 14:09:58",
                        toName: "软软爷爷"
                    },
                    {
                        content: "555",
                        id: "2",
                        index: "3",
                        replyer: {
                            avatar: "http://pay.gulubaobao.com/images/ic_launcher_small.png",
                            name: "软软爷爷"
                        },
                        replyer_id: "125968",
                        time: "2016-03-08 14:09:41",
                        toName: ""
                    }
                ]
            };
        }

        res.json(obj);
    });
};