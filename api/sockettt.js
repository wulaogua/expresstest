const net = require('net');
const express = require('express');
const router = express.Router(); //新建路由
const { yanshiy } = require('../modb')
const { qixiangz } = require('../modb')
const schedule = require('node-schedule');
let portaddrs;
async function dingshi() {
    //开启链接
    let conntrult = await getConnection('conntrult')
        //定义定时器
    let rule = new schedule.RecurrenceRule();
    rule.minute = [00, 15, 30, 45];
    //定时器动作
    schedule.scheduleJob(rule, async() => {
        const id = ['FX015', 'FX015', 'FX015', 'FX016', 'FX016', 'FX016', 'FX017', 'FX017', 'FX017', 'FX017', 'FX018', 'FX018', 'FX018', 'FX019', 'FX019', 'FX019']
        const sbbmlist = ['33487400922807001', '33487400922807002', '33487400922807003', '33487400922807004', '33487400922807005', '33487400922807006', '33487400922807007', '33487400922807008', '33487400922807009', '33487400922807010', '33487400922807011', '33487400922807012', '33487400922807013', '33487400922807014', '33487400922807015', '33487400922807016', ]
            //每15分钟拉一次数据
        let datalist = await shuju();
        //循环数组
        for (let i = 0; i <= 15; i++) {
            setTimeout(async() => {
                switch (true) {
                    case i == 0:
                        let overdata1 = datachuli(portaddrs, sbbmlist[0], '777310', 'FX050', datalist[1].data)
                        await writeData(conntrult, JSON.stringify(overdata1));
                        break;

                    case i > 0:
                        let overdata2 = datachuli(portaddrs, sbbmlist[i], '616710', id[i - 1], datalist[0].data[i - 1])
                        await writeData(conntrult, JSON.stringify(overdata2));
                        break;
                }

            }, 500 * i);
        }
    });
}
async function getConnection(connName) {
    let client = await net.connect({ port: 8089, host: '120.55.69.237' },
        function() {
            portaddrs = `39.99.205.217:${this.localPort}`
                //this.setTimeout(2000);
            this.setEncoding('utf8');
            this.on('data', function(data) {
                console.log(connName + " From Server:" + data.toString());
                //this.end();
            });
            this.on('end', function() {
                console.log(connName + 'Client disconnection');
            });
            this.on('error', function(err) {
                console.log('Socket Error:' + JSON.stringify(err));
            });
            this.on('timeout', function() {
                console.log('Socket Timed Out');
            });
            this.on('close', function() {
                console.log('Socket Closed');
            });
        });
    return client;
}

function datachuli(ip, sbbm, equipment, id, data) {

    let obj = {
        ip: {
            sbbm: {
                equipmentType: equipment,
                equipmentId: id,
                data: data
            }

        }
    };
    obj.ip[sbbm] = obj.ip.sbbm
    delete obj.ip.sbbm;
    obj[ip] = obj.ip
    delete obj.ip;
    return obj;
}
//写数据
function writeData(socket, data) {
    let success = !socket.write(data);
    if (!success) {
        (function(socket, data) {
            socket.once('drain', function() {
                writeData(socket, data);
            });
        })(socket, data);
        return 1
    } else {
        return 2
    }
}
//拉数据
async function shuju() {
    //拉数据
    let yandata = [];
    let yanlist = [];
    let qilist;
    const yanshiyong = await yanshiy.find({ "machinekey": { "$in": ["FX016", "FX017", "FX018", "FX019", "FX020"] } }).sort({ "time": -1 }).limit(5);
    const qixiang = await qixiangz.find({}).sort({ "time": -1 }).limit(1);
    let tmp = Date.parse(new Date()).toString().substr(0, 10);
    if (yanshiyong || qixiang) {
        //循环大棚数组
        yanshiyong.forEach(item => {
            yandata.push({
                s1: item.tair1,
                s2: item.airhumidity1,
                s3: item.Soiltemp1,
                s4: item.soilmoisture1,
                s5: item.soi1,
                s14: item.co21,
                revTime: tmp
            }, {
                s1: item.tair2,
                s2: item.airhumidity2,
                s3: item.Soiltemp2,
                s4: item.soilmoisture2,
                s5: item.soi2,
                s14: item.co22,
                revTime: tmp
            }, {
                s1: item.tair2,
                s2: item.airhumidity2,
                s3: item.Soiltemp2,
                s4: item.soilmoisture2,
                s5: item.soi2,
                s14: item.co22,
                revTime: tmp
            })
        });
        //拼接大棚数组
        yanlist = {
            ip: '39.99.205.217',
            sbbm: '616710',
            data: [
                { 'FX015': yandata[0] },
                { 'FX015': yandata[1] },
                { 'FX015': yandata[2] },
                { 'FX016': yandata[3] },
                { 'FX016': yandata[4] },
                { 'FX016': yandata[5] },
                { 'FX017': yandata[6] },
                { 'FX017': yandata[7] },
                { 'FX017': yandata[8] },
                { 'FX018': yandata[9] },
                { 'FX018': yandata[10] },
                { 'FX018': yandata[11] },
                { 'FX019': yandata[12] },
                { 'FX019': yandata[13] },
                { 'FX019': yandata[14] },
            ],
        };
        qilist = {
            ip: '39.99.205.217',
            sbbm: '7773',
            data: {
                'FX050': {
                    s1: qixiang[0].tair1, //温度
                    s2: qixiang[0].airhumidity1, //湿度
                    s5: qixiang[0].soi1, //光照
                    s17: qixiang[0].fengsu, //风速
                    s18: '5', //风向
                    s19: '10', //降雨量
                    revTime: tmp
                }
            }
        };
        return [yanlist, qilist];
    } else {
        return false;
    }
}
module.exports = { dingshi };