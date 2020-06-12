const express = require('express');
const router = express.Router(); //新建路由
const { sensorA } = require('../modb')
const stringRandom = require('string-random')
const schedule = require('node-schedule')

const fucnc1 = () => {
    //每分钟的10秒都会触发，其它通配符依次类推
    //console.log('scheduleCronstyle:' + new Date());
    let tt;
    schedule.scheduleJob('10 * * * * *',
        async() => {
            for (var i = 1; i < 200; i++) {
                switch (true) {
                    case i <= 9:
                        tt = `FX00${i}`;
                        task1(tt);
                        break;

                    case i <= 99:
                        tt = `FX0${i}`;
                        task1(tt);
                        break;

                    case i <= 200:
                        tt = `FX${i}`;
                        task1(tt);
                        break;
                }

            }
        })
}
async function task1(data) {

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
        updatetime: new Date()
    })
};



router.post('/api/seachdata', async(req, res) => {
    const adata = await sensorA.find({ machinekey: req.body.machinekey }).sort({ "time": -1 }).limit(13)
        // let testdate = adata[0].updatetime.split(' ')[4]
        //  var ch2rjy2, ch3ph1, ch4ph2, ch5rjy1, ch6rjy2, ch7ph1, ch8ph2, ch9rjy1, ch10rjy2, ch11ph1, ch12ph2, ch13rjy1, ch14rjy2, ch15ph1, ch16ph2, ch17rjy1, ch18rjy2, ch19ph1, ch20ph2, ch21rjy1, ch22rjy2, ch23ph1, ch24ph2, ch25rjy1, ch26rjy2, ch27ph1, ch28ph2, ch29rjy1, ch30rjy2, ch31ph1, ch32ph2 = Array();
        // var a, b;
    var ch1rjy1 = Object()

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

module.exports = { router, fucnc1 };