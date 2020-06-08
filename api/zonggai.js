const express = require('express');
const router = express.Router(); //新建路由
const { zongland } = require('../modb')
const jwt = require('jsonwebtoken')
const seckey = 'dsd' //tonken的密钥

async function randadd(data) {
    let namelist = ['测试1', '测试2', '测试3', '测试4', '测试5', '测试6', '测试7', '测试8'];
    let boolenlist = [true, false, true, false, true, false, true, false, true, false, true, false];
    let renwulist = ['任务1', '任务2', '任务3', '任务4', '任务5', '任务6', '任务7', '任务8', '任务9', '任务10', '任务1'];
    let baojinglist = ['报警1', '报警2', '报警3', '报警4', '报警5', '报警6', '报警7', '报警8', '报警9', '报警10', '报警1'];
    let shebeilist = ['传感1', '传感2', '传感3', '传感4', '传感5', '传感6', '传感7', '传感8', '传感9', '传感10', '传感1'];
    let jiankonglist = ['监控1', '监控2', '监控3', '监控4', '监控5', '监控6', '监控7', '监控8', '监控9', '监控10', '监控1'];
    let sslist = [
        { id: "rjy1", name: "溶解氧1" },
        { id: "rjy1", name: "溶解氧2" },
        { id: "ph1", name: "ph1" },
        { id: "ph2", name: "ph2" },
        { id: "qiya1", name: "气压1" },
        { id: "qiya2", name: "气压2" },
        { id: "shuiwen1", name: "水温1" },
        { id: "shuiwen2", name: "水温2" },
        { id: "guangzhao1", name: "关照1" },
        { id: "guangzhao2", name: "关照2" },
        { id: "guangzhao3", name: "关照3" },
    ]
    let rdatlist = [0, 3, 0, 2, 3, 1, 0, 3, 1, 3, 0];
    for (let p = 0; p < 8; p++) {
        let randdata = Math.ceil(Math.random() * 10); //生成1-10
        let slist = Array();
        for (let y = 0; y < 4; y++) {
            let snumb = Math.ceil(Math.random() * 10);
            slist.push(sslist[snumb])
        }
        await zongland.create({
            name: namelist[p], //网关下子片区名称
            waringnumb: rdatlist[randdata], //网关下子片区报警数量
            renwuname: renwulist[randdata], //网关下子片区未来任务名称
            waringstr: baojinglist[randdata], //网关下子片区报警信息
            renwuing: renwulist[randdata], //网关下子片区正在运行的任务
            shezhi: "溶解氧1", //网关下子片区默认初始监控参数
            videoname: jiankonglist[randdata], //网关下子片区监控名称
            videobool: boolenlist[randdata], //网关下子片区是否有用监控
            videoaddr: "http://hls01open.ys7.com/openlive/1c1e7cef992584d8b988a459a3965683d.m3u8", //网关下子片区监控地址
            sensorlist: slist, //网关下子片区信息列表 { id: "rjy2", name: "溶解氧" },
            machinekey: data,
        })
    }
}

router.post('/api/zonglan/adddata', async(req, res) => {
    let tt;
    for (var i = 1; i < 200; i++) {
        switch (true) {
            case i <= 9:
                tt = `FX00${i}`;
                await randadd(tt);
                break;

            case i <= 99:
                tt = `FX0${i}`;
                await randadd(tt);
                break;

            case i <= 200:
                tt = `FX${i}`;
                await randadd(tt);
                break;
        }

    }
})

router.post('/api/zonglan/searchdata', async(req, res) => {
    const zonglandata = await zongland.find({ "machinekey": req.body.machinekey })
    if (zonglandata) {
        res.send({
            zonglandata,
            "meta": {
                'msg': "读取成功",
                'status': 200
            }
        })
    } else {
        res.send({
            "meta": {
                'msg': "读取失败",
                'status': 422
            }
        })
    }
})



module.exports = router;