const express = require('express');
const router = express.Router(); //新建路由

const { sensorA } = require('../modb')
const { sensoro } = require('../modb')
const { ProjectL } = require('../modb')
const { videolist } = require('../modb')
const jwt = require('jsonwebtoken')
const seckey = 'dsd' //tonken的密钥

const stringRandom = require('string-random')
const schedule = require('node-schedule')
const axios = require('axios')
const qs = require('qs');

const fucnc1 = () => {
    //每分钟的10秒都会触发，其它通配符依次类推
    //console.log('scheduleCronstyle:' + new Date());
    let tt;
    let timedata = new Date();

    schedule.scheduleJob('10 * * * * *',
        async() => {
            for (var i = 1; i < 200; i++) {
                switch (true) {
                    case i <= 9:
                        tt = `FX00${i}`;
                        task1(tt, timedata);
                        task2(tt, timedata);
                        break;

                    case i <= 99:
                        tt = `FX0${i}`;
                        task1(tt, timedata);
                        task2(tt, timedata);
                        break;

                    case i <= 200:
                        tt = `FX${i}`;
                        task1(tt, timedata);
                        task2(tt, timedata);
                        break;
                }

            }
        })
}

const plateInAuth = async(req, res, next) => {
    const raw = req.headers.authorization.split(' ').pop()
    const { username } = jwt.verify(raw, seckey)
    req.chartname = username
    next()
}

async function task2(data, data1) {
    await sensoro.create({
        machinekey: data,
        tair: stringRandom(2, { letters: false }), //温度
        airhumidity: stringRandom(2, { letters: false }), //湿度
        Soiltemp: stringRandom(2, { letters: false }), //土壤温度
        soilmoisture: stringRandom(2, { letters: false }), //土壤湿度
        soi: stringRandom(3, { letters: false }), //光照强度
        rainfall: stringRandom(2, { letters: false }), //降雨量
        time: data1,
    })
}



async function task1(data, data2) {

    await sensorA.create({
        machinekey: data,
        ch1rjy1: stringRandom(2, { letters: false }),
        ch2rjy2: stringRandom(2, { letters: false }),
        ch3ph1: stringRandom(2, { letters: false }),
        ch4ph2: stringRandom(2, { letters: false }),
        ch5rjy1: stringRandom(2, { letters: false }),
        ch6rjy2: stringRandom(2, { letters: false }),
        ch7ph1: stringRandom(2, { letters: false }),
        ch8ph2: stringRandom(2, { letters: false }),
        ch9rjy1: stringRandom(2, { letters: false }),
        ch10rjy2: stringRandom(2, { letters: false }),
        ch11ph1: stringRandom(2, { letters: false }),
        ch12ph2: stringRandom(2, { letters: false }),
        ch13rjy1: stringRandom(2, { letters: false }),
        ch14rjy2: stringRandom(2, { letters: false }),
        ch15ph1: stringRandom(2, { letters: false }),
        ch16ph2: stringRandom(2, { letters: false }),
        ch17rjy1: stringRandom(2, { letters: false }),
        ch18rjy2: stringRandom(2, { letters: false }),
        ch19ph1: stringRandom(2, { letters: false }),
        ch20ph2: stringRandom(2, { letters: false }),
        ch21rjy1: stringRandom(2, { letters: false }),
        ch22rjy2: stringRandom(2, { letters: false }),
        ch23ph1: stringRandom(2, { letters: false }),
        ch24ph2: stringRandom(2, { letters: false }),
        ch25rjy1: stringRandom(2, { letters: false }),
        ch26rjy2: stringRandom(2, { letters: false }),
        ch27ph1: stringRandom(2, { letters: false }),
        ch28ph2: stringRandom(2, { letters: false }),
        ch29rjy1: stringRandom(2, { letters: false }),
        ch30rjy2: stringRandom(2, { letters: false }),
        ch31ph1: stringRandom(2, { letters: false }),
        ch32ph2: stringRandom(2, { letters: false }),
        updatetime: data2,
    })
};

router.post('/api/seachdata', async(req, res) => {
    const adata = await sensorA.find({ machinekey: req.body.machinekey }).sort({ "time": -1 }).limit(1)
        // let testdate = adata[0].updatetime.split(' ')[4]
        //  var ch2rjy2, ch3ph1, ch4ph2, ch5rjy1, ch6rjy2, ch7ph1, ch8ph2, ch9rjy1, ch10rjy2, ch11ph1, ch12ph2, ch13rjy1, ch14rjy2, ch15ph1, ch16ph2, ch17rjy1, ch18rjy2, ch19ph1, ch20ph2, ch21rjy1, ch22rjy2, ch23ph1, ch24ph2, ch25rjy1, ch26rjy2, ch27ph1, ch28ph2, ch29rjy1, ch30rjy2, ch31ph1, ch32ph2 = Array();
        // var a, b;
        /* adata.forEach(async(item, i) => {
             if (i < 1) {
                 console.log(item)
             }
               a[i] = item.ch1rjy1;
              b[i] = item.updatetime.split(' ')[4]
              ch1rjy1.data = a;
              ch1rjy1.time = b;
               ch2rjy2.data.push(item.ch2rjy2);
               ch3ph1.data.push(item.ch3ph1);
               ch4ph2.data.push(item.ch4ph2);
               ch5rjy1.data.push(item.ch5rjy1);
               ch6rjy2.data.push(item.ch6rjy2);
               ch7ph1.data.push(item.ch7ph1);
               ch8ph2.data.push(item.ch8ph2);
               ch9rjy1.data.push(item.ch9rjy1);
               ch10rjy2.data.push(item.ch10rjy2);
               ch11ph1.data.push(item.ch11ph1);
               ch12ph2.data.push(item.ch12ph2);
               ch13rjy1.data.push(item.ch13rjy1);
               ch14rjy2.data.push(item.ch14rjy2);
               ch15ph1.data.push(item.ch15ph1);
               ch16ph2.data.push(item.ch16ph2);
               ch17rjy1.data.push(item.ch17rjy1);
               ch18rjy2.data.push(item.ch18rjy2);
               ch19ph1.data.push(item.ch19ph1);
               ch20ph2.data.push(item.ch20ph2);
               ch21rjy1.data.push(item.ch21rjy1);
               ch22rjy2.data.push(item.ch22rjy2);
               ch23ph1.data.push(item.ch23ph1);
               ch24ph2.data.push(item.ch24ph2);
               ch25rjy1.data.push(item.ch25rjy1);
               ch26rjy2.data.push(item.ch26rjy2);
               ch27ph1.data.push(item.ch27ph1);
               ch28ph2.data.push(item.ch28ph2);
               ch29rjy1.data.push(item.ch29rjy1);
               ch30rjy2.data.push(item.ch30rjy2);
               ch31ph1.data.push(item.ch31ph1);
               ch32ph2.data.push(item.ch32ph2); 
         })*/
    var activityList = [];
    const activityData = adata[0].toJSON();
    for (const key in activityData) {
        if (activityData[key]) {
            activityList = activityList.concat(activityData[key]);
        }
    }
    res.send(activityList);
})

router.post('/api/seachdataOne', async(req, res) => {
    const adata = await sensoro.find({ machinekey: req.body.machinekey }).sort({ "time": -1 }).limit(1)
    res.send(adata);
})

router.post('/api/seachdatahour', async(req, res) => {
    let timedata = new Date() //当时时间
        /*     let timedata1; //-1时
            let timearry = timedata.toLocaleString().split(' ') //转换成数组
            let timearry1 = timearry[1].split(':')

            if (timearry1[0] === 0) {
                console.log('1')
            } 
            else {
                timearry1[0] = timearry1[0] - 1
                timearry[1] = timearry1.join(':')
                timedata1 = timearry.join(' ')
                console.log(timedata1)
                console.log(timedata.toLocaleString())
                const adata = await sensoro.find({ "machinekey": req.body.machinekey, "time": { "$gt": timedata1, "$lt": timedata.toLocaleString() } }) //获取数据
                res.send(adata);
            } */
})

router.post('/api/seachdata/addvideo', plateInAuth, async(req, res) => {
    let data = qs.stringify({
        'appKey': req.body.AppKey,
        'appSecret': req.body.Secret
    });
    const { data: resdata } = await axios.post('https://open.ys7.com/api/lapp/token/get', data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
    if (resdata.data) {
        const vlaue = await ProjectL.updateOne({ 'username': req.chartname, 'projectnumb': req.body.projectnumb }, { 'appkey': req.body.AppKey, 'secret': req.body.Secret, 'accessToken': resdata.data.accessToken })
        if (vlaue) {
            res.send({
                'data': resdata.data,
                "meta": {
                    'msg': "查询成功",
                    'status': 200
                }
            })
        } else {
            res.send({
                "meta": {
                    'msg': "查询失败",
                    'status': 403
                }
            })
        }
    } else {
        res.send({
            "meta": {
                'msg': "查询失败",
                'status': 403
            }
        })
    }
})

router.post('/api/seachdata/oneseachvideo', plateInAuth, async(req, res) => {
    const data = await videolist.findOne({ 'adminname': req.chartname, 'projectnumb': req.body.projectnumb })
    if (data) {
        res.send({
            'data': data,
            "meta": {
                'msg': "查询成功",
                'status': 200
            }
        })
    } else {
        res.send({
            "meta": {
                'msg': "无数据",
                'status': 403
            }
        })
    }
})


router.post('/api/seachdata/seachvideo', plateInAuth, async(req, res) => {
    let videolistform = [];
    let idchanne = [];
    let channellist = [];
    let videkey;
    let data = qs.stringify({
        'appKey': req.body.AppKey,
        'appSecret': req.body.Secret
    });
    //获取萤石云TOKEN
    const { data: resda } = await axios.post('https://open.ys7.com/api/lapp/token/get', data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
    if (resda.data) {
        //更新ProjectL视频信息
        const vlaue = await ProjectL.updateOne({ 'username': req.chartname, 'projectnumb': req.body.projectnumb }, { 'appkey': req.body.AppKey, 'secret': req.body.Secret, 'accessToken': resda.data.accessToken })
        if (vlaue) {
            //查询ProjectL中保持的数据
            const prldata = await ProjectL.findOne({ 'username': req.chartname, 'projectnumb': req.body.projectnumb })
            let value = qs.stringify({
                'accessToken': resda.data.accessToken,
                'pageStart': 0,
                'pageSize': ''
            });
            //查询萤石云设备（硬盘录像机）列表
            const { data: resdata } = await axios.post('https://open.ys7.com/api/lapp/device/list', value, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            })
            resdata.data.every(item => {
                if (item.deviceName === prldata.areaname) {
                    videkey = item.deviceSerial
                    return false;
                } else {
                    return true;
                }
            });
            if (videkey) {
                let value1 = qs.stringify({
                    'accessToken': resda.data.accessToken,
                    'deviceSerial': videkey,
                });
                //获取设备列表下监控名称（硬盘录像机下通道，无绑定通道先修改null）
                const { data: resdata1 } = await axios.post('https://open.ys7.com/api/lapp/device/camera/list', value1, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                })
                if (resdata1.code !== '10001') {
                    channellist = resdata1.data.filter((item) => {
                        return item.channelName !== 'null'
                    })
                } else {
                    return false;
                }
                if (channellist.length !== 0) {
                    channellist.forEach((item) => {
                        idchanne.push(item.deviceSerial + ':' + item.channelNo)
                    })
                    let value2 = qs.stringify({
                        'accessToken': resda.data.accessToken,
                        'source': idchanne.toString(),
                    });
                    //查询监控对应的直播地址
                    const { data: resdata2 } = await axios.post('https://open.ys7.com/api/lapp/live/address/get', value2, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                    })
                    if (resdata2.code === '200') {
                        for (let i = 0; i < resdata2.data.length; i++) {
                            videolistform[i] = {
                                deviceSerial: resdata2.data[i].deviceSerial,
                                channelNo: resdata2.data[i].channelNo,
                                channelName: channellist[i].channelName,
                                picUrl: resdata2.data[i].hls
                            }
                        }
                        const vlauedata = await videolist.create({ 'adminname': req.chartname, 'projectnumb': req.body.projectnumb, 'videourl': videolistform })
                        res.send({
                            'data': videolistform,
                            "meta": {
                                'msg': "查询成功",
                                'status': 200
                            }
                        })
                    } else {
                        res.send({
                            "meta": {
                                'msg': "查询直播地址失败",
                                'status': 403
                            }
                        })
                    }
                } else {
                    res.send({
                        "meta": {
                            'msg': "查询设备通道失败",
                            'status': 403
                        }
                    })
                }
            } else {
                res.send({
                    "meta": {
                        'msg': "查询设备(硬盘录像机)失败",
                        'status': 403
                    }
                })
            }
        } else {
            res.send({
                "meta": {
                    'msg': "视频信息更新失败",
                    'status': 403
                }
            })
        }
    } else {
        res.send({
            "meta": {
                'msg': "token获取失败",
                'status': 403
            }
        })
    }

})
module.exports = { router, fucnc1 };