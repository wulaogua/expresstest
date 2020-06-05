const express = require('express');
const router = express.Router(); //新建路由
const { zongland } = require('../modb')
const jwt = require('jsonwebtoken')
const seckey = 'dsd' //tonken的密钥

async function randadd(data) {
    let namelist = ['测试1', '测试2', '测试3', '测试4', '测试5', '测试6', '测试7', '测试8'];
    let boolenlist = [true, false, true, false, true, false, true, false, true, false, true];
    let renwulist = ['任务1', '任务2', '任务3', '任务4', '任务5', '任务6', '任务7', '任务8'];
    let baojinglist = ['报警1', '报警2', '报警3', '报警4', '报警5', '报警6', '报警7', '报警8'];
    let shebeilist = ['传感1', '传感2', '传感3', '传感4', '传感5', '传感6', '传感7', '传感8'];
    let jiankonglist = ['监控1', '监控2', '监控3', '监控4', '监控5', '监控6', '监控7', '监控8'];
    let rdatlist1 = [2, 3, 1, 2, 3, 1, 2, 3, 1, 3, 2];
    let rdatlist2 = [3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1]
    for (let i = 0; i < 8; i++) {
        let waringnumb = Math.ceil(Math.random() * 10);
        let randdata = Math.ceil(Math.random() * 10); //生成1-10
        const UserChildrens = await zongland.create({
            name: namelist[i], //网关下子片区名称
            waringnumb: rdatlist[randdata], //网关下子片区报警数量
            renwuname: renwulist[randdata], //网关下子片区未来任务名称
            waringstr: baojinglist[randdata], //网关下子片区报警信息
            renwuing: renwulist[randdata], //网关下子片区正在运行的任务
            shezhi: shebeilist[randdata], //网关下子片区默认初始监控参数
            videoname: jiankonglist[randdata], //网关下子片区监控名称
            videobool: boolenlist[randdata], //网关下子片区是否有用监控
            videoaddr: "http://hls01open.ys7.com/openlive/1c1e7cef992584d8b988a459a3965683d.m3u8", //网关下子片区监控地址
            sensorlist: '', //网关下子片区信息列表 { id: "rjy2", name: "溶解氧" },
            // machinekey: ,
        })
    }

}

router.post('/api/zonglan/adddata', Cauth, async(req, res) => {

})



module.exports = router;