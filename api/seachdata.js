const express = require('express');
const router = express.Router(); //新建路由

const { sensorA } = require('../modb')
const { sensoro } = require('../modb')
const { ProjectL } = require('../modb')
const { videolist } = require('../modb')
const { yanshiy } = require('../modb')
const { qixiangz } = require('../modb')
const jwt = require('jsonwebtoken')
const seckey = 'dsd' //tonken的密钥

const stringRandom = require('string-random')
const schedule = require('node-schedule')
const axios = require('axios')
const qs = require('qs');


let tairaa = [{
    date: '2020-7-7 00:00:00',
    name: '空气温度',
    data1: '27.1',
    data2: '90',
    data3: '0',
    data3: '0',
    data4: '743',
    data5: 2.5,
    data6: 96,
},
{
    date: '2020-7-7 01:00:00',
    name: '空气温度',
    data1: '28.9',
    data2: '82',
    data3: '0',
    data4: '739',
    data5: 2.1,
    data6: 99,
},
{
    date: '2020-7-7 02:00:00',
    name: '空气温度',
    data1: '30.1',
    data2: '76',
    data3: '0',
    data4: '736',
    data5: 1.9,
    data6: 93,
},
{
    date: '2020-7-7 03:00:00',
    name: '空气温度',
    data1: '30.6',
    data2: '78',
    data3: '0',
    data4: '735',
    data5: 2.7,
    data6: 72,
},
{
    date: '2020-7-7 04:00:00',
    name: '空气温度',
    data1: '31.8',
    data2: '74',
    data3: '0',
    data4: '735',
    data5: 3.6,
    data6: 93,
},
{
    date: '2020-7-7 05:00:00',
    name: '空气温度',
    data1: '32.5',
    data2: '69',
    data3: '0',
    data4: '736',
    data5: 3.1,
    data6: 100,
},
{
    date: '2020-7-7 06:00:00',
    name: '空气温度',
    data1: '33.3',
    data2: '65',
    data3: '51',
    data4: '736',
    data5: 3.2,
    data6: 86,
},
{
    date: '2020-7-7 07:00:00',
    name: '空气温度',
    data1: '33.1',
    data2: '66',
    data3: '621',
    data4: '748',
    data5: 3.2,
    data6: 67,
},
{
    date: '2020-7-7 08:00:00',
    name: '空气温度',
    data1: '27.3',
    data2: '68',
    data3: '5000',
    data4: '807',
    data5: 4,
    data6: 79,
},
{
    date: '2020-7-7 09:00:00',
    name: '空气温度',
    data1: '28.1',
    data2: '85',
    data3: '5700',
    data4: '905',
    data5: 3.7,
    data6: 88,
},
{
    date: '2020-7-7 10:00:00',
    name: '空气温度',
    data1: '28.5',
    data2: '85',
    data3: '7000',
    data4: '977',
    data5: 4.8,
    data6: 90,
},
{
    date: '2020-7-7 11:00:00',
    name: '空气温度',
    data1: '28.8',
    data2: '71',
    data3: '8000',
    data4: '1008',
    data5: 4.9,
    data6: 67,
},
{
    date: '2020-7-7 12:00:00',
    name: '空气温度',
    data1: '28',
    data2: '72',
    data3: '9000',
    data4: '1024',
    data5: 3.3,
    data6: 91,
},
{
    date: '2020-7-7 13:00:00',
    name: '空气温度',
    data1: '28',
    data2: '72',
    data3: '13000',
    data4: '1039',
    data5: 3.5,
    data6: 86,
},
{
    date: '2020-7-7 14:00:00',
    name: '空气温度',
    data1: '29',
    data2: '75',
    data3: '17000',
    data4: '1038',
    data5: 2.9,
    data6: 92,
},
{
    date: '2020-7-7 15:00:00',
    name: '空气温度',
    data1: '28',
    data2: '72',
    data3: '10000',
    data4: '1024',
    data5: 3.5,
    data6: 73,
},

{
    date: '2020-7-7 16:00:00',
    name: '空气温度',
    data1: '28',
    data2: '72',
    data3: '6000',
    data4: '962',
    data5: 3,
    data6: 87,

},
{
    date: '2020-7-7 17:00:00',
    name: '空气温度',
    data1: '28',
    data2: '70',
    data3: '4000',
    data4: '896',
    data5: 2.9,
    data6: 67,

},
{
    date: '2020-7-7 18:00:00',
    name: '空气温度',
    data1: '27',
    data2: '75',
    data3: '1750',
    data4: '849',
    data5: 3.4,
    data6: 59,
},
{
    date: '2020-7-7 19:00:00',
    name: '空气温度',
    data1: '26',
    data2: '77',
    data3: '300',
    data4: '821',
    data5: 1.8,
    data6: 64,
},
{
    date: '2020-7-7 20:00:00',
    name: '空气温度',
    data1: '26',
    data2: '100',
    data3: '100',
    data4: '809',
    data5: 2.2,
    data6: 80,
},
{
    date: '2020-7-7 21:00:00',
    name: '空气温度',
    data1: '24.4',
    data2: '100',
    data3: '20',
    data4: '796',
    data5: 2.2,
    data6: 75,
},
{
    date: '2020-7-7 22:00:00',
    name: '空气温度',
    data1: '25',
    data2: '100',
    data3: '0',
    data4: '784',
    data5: 1.5,
    data6: 68,
},
{
    date: '2020-7-7 23:00:00',
    name: '空气温度',
    data1: '25.1',
    data2: '100',
    data3: '0',
    data4: '773',
    data5: 1.2,
    data6: 79,
},
];
let tair = [{
    date: '2020-7-7 00:00:00',
    name: '空气温度',
    data1: '27.1',
    data2: '90',
    data3: '0',
    data3: '0',
    data4: '743'
},
{
    date: '2020-7-7 01:00:00',
    name: '空气温度',
    data1: '28.9',
    data2: '82',
    data3: '0',
    data4: '739'
},
{
    date: '2020-7-7 02:00:00',
    name: '空气温度',
    data1: '30.1',
    data2: '76',
    data3: '0',
    data4: '736'
},
{
    date: '2020-7-7 03:00:00',
    name: '空气温度',
    data1: '30.6',
    data2: '78',
    data3: '0',
    data4: '735'
},
{
    date: '2020-7-7 04:00:00',
    name: '空气温度',
    data1: '31.8',
    data2: '74',
    data3: '0',
    data4: '735'
},
{
    date: '2020-7-7 05:00:00',
    name: '空气温度',
    data1: '32.5',
    data2: '69',
    data3: '0',
    data4: '736'
},
{
    date: '2020-7-7 06:00:00',
    name: '空气温度',
    data1: '33.3',
    data2: '65',
    data3: '51',
    data4: '736',
},
{
    date: '2020-7-7 07:00:00',
    name: '空气温度',
    data1: '33.1',
    data2: '66',
    data3: '621',
    data4: '748',
},
{
    date: '2020-7-7 08:00:00',
    name: '空气温度',
    data1: '28.3',
    data2: '68',
    data3: '5000',
    data4: '807',
},
{
    date: '2020-7-7 09:00:00',
    name: '空气温度',
    data1: '27.9',
    data2: '85',
    data3: '5300',
    data4: '905',
},
{
    date: '2020-7-7 10:00:00',
    name: '空气温度',
    data1: '27.5',
    data2: '85',
    data3: '5300',
    data4: '977',
},
{
    date: '2020-7-7 11:00:00',
    name: '空气温度',
    data1: '27.8',
    data2: '71',
    data3: '5300',
    data4: '1008',

},
{
    date: '2020-7-7 12:00:00',
    name: '空气温度',
    data1: '28',
    data2: '75',
    data3: '5300',
    data4: '1024',
},
{
    date: '2020-7-7 13:00:00',
    name: '空气温度',
    data1: '28',
    data2: '74',
    data3: '5300',
    data4: '1039',
},
{
    date: '2020-7-7 14:00:00',
    name: '空气温度',
    data1: '28',
    data2: '73',
    data3: '5200',
    data4: '1100',
},
{
    date: '2020-7-7 15:00:00',
    name: '空气温度',
    data1: '28',
    data2: '71',
    data3: '5200',
    data4: '1024',
},

{
    date: '2020-7-7 16:00:00',
    name: '空气温度',
    data1: '27',
    data2: '73',
    data3: '5100',
    data4: '962',

},
{
    date: '2020-7-7 17:00:00',
    name: '空气温度',
    data1: '26',
    data2: '72',
    data3: '4000',
    data4: '896',

},
{
    date: '2020-7-7 18:00:00',
    name: '空气温度',
    data1: '26',
    data2: '74',
    data3: '1750',
    data4: '849',
},
{
    date: '2020-7-7 19:00:00',
    name: '空气温度',
    data1: '25',
    data2: '77',
    data3: '300',
    data4: '821',
},
{
    date: '2020-7-7 20:00:00',
    name: '空气温度',
    data1: '24.1',
    data2: '76',
    data3: '100',
    data4: '809',
},
{
    date: '2020-7-7 21:00:00',
    name: '空气温度',
    data1: '24.4',
    data2: '77',
    data3: '20',
    data4: '796',
},
{
    date: '2020-7-7 22:00:00',
    name: '空气温度',
    data1: '25',
    data2: '100',
    data3: '0',
    data4: '784',
},
{
    date: '2020-7-7 23:00:00',
    name: '空气温度',
    data1: '25.1',
    data2: '100',
    data3: '0',
    data4: '773',
},
];

function fucnc1() {

    //每分钟的10秒都会触发，其它通配符依次类推
    //console.log('scheduleCronstyle:' + new Date());
    let tt;
    let tt1;

    schedule.scheduleJob('10 * * * * *',
        async () => {
            let d =new Date()
           let formatDateTime = function (date) {  
                let y = date.getFullYear();  
                let m = date.getMonth() + 1;  
                m = m < 10 ? ('0' + m) : m;  
                let d = date.getDate();  
                d = d < 10 ? ('0' + d) : d;  
                let h = date.getHours();  
                h=h < 10 ? ('0' + h) : h;  
                let minute = date.getMinutes();  
                minute = minute < 10 ? ('0' + minute) : minute;  
                let second=date.getSeconds();  
                second=second < 10 ? ('0' + second) : second;  
                return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
            }; 
            let timedata = formatDateTime(d); //当前时间
            let timehouer = parseInt(timedata.split(' ')[1].split(':').join('')) //当前小时
            let o;
            for (o = 0; o < tair.length - 1; o++) {
                if (timehouer < 230000) {
                    let biaohouer = parseInt(tair[o].date.split(' ')[1].split(':').join('')) //数组的小时
                    let biaohouer_1 = parseInt(tair[o + 1].date.split(' ')[1].split(':').join(''))//数组的小时
                    //当当前时间处于两个数据之间时写入小的组的数据
                    if (timehouer > biaohouer && timehouer < biaohouer_1) {
                        let sahngsheng1;
                        let sahngsheng2;
                        switch (true) {
                            case o > 0 && o < 5:
                                tairaa[o].data3 = parseInt(tairaa[o].data3);
                                tairaa[o].data4 = parseInt(tairaa[o].data4);
                                break;
                            case o >= 5 && o < 14:
                                sahngsheng1 = Math.round((parseInt(tair[o + 1].data3) - parseInt(tair[o].data3)) / 59); //求出差值/59 eg:i 51 i+1 621 7
                                sahngsheng2 = Math.round((parseInt(tair[o + 1].data4) - parseInt(tair[o].data4)) / 59); //求出差值/59 eg:i 51 i+1 621 7
                                tairaa[o].data3 = parseInt(tairaa[o].data3) + parseInt(sahngsheng1); //一直往上加每一分钟差值//
                                tairaa[o].data4 = parseInt(tairaa[o].data4) + parseInt(sahngsheng2); //一直往上加每一分钟差值//
                                break;
                            case o >= 14 && o < 20:
                                sahngsheng1 = Math.round((parseInt(tair[o].data3) - parseInt(tair[o + 1].data3)) / 59); //求出差值/59 eg:i 51 i+1 621 7
                                sahngsheng2 = Math.round((parseInt(tair[o].data4) - parseInt(tair[o + 1].data4)) / 59); //求出差值/59 eg:i 51 i+1 621 7
                                tairaa[o].data3 = parseInt(tairaa[o].data3) - parseInt(sahngsheng1); //一直往上减每一分钟差值   
                                tairaa[o].data4 = parseInt(tairaa[o].data4) - parseInt(sahngsheng2); //一直往上减每一分钟差值  
                                break;
                            case o >= 20 && o < 23:
                                tairaa[o].data3 = parseInt(tairaa[o].data3);
                                tairaa[o].data4 = parseInt(tairaa[o].data4);
                                break;
                        }
                        task4(timedata, tair[o], tairaa[o].data3, tairaa[o].data5, tairaa[o].data6, o)
                        for (let p = 16; p < 21; p++) {
                            switch (true) {
                                case p <= 20:
                                    tt = `FX0${p}`;
                                    task3(tt, timedata, tair[o], tairaa[o].data3, tairaa[o].data4, sahngsheng1, sahngsheng2, o);
                                    break;
                            }
                        }
                    }
                } else {

                    for (let p = 16; p < 21; p++) {
                        switch (true) {
                            case p <= 20:
                                tt1 = `FX0${p}`;
                                task3(tt1, timedata, tair[o], tairaa[o].data3, tairaa[o].data4, 0, 0, 23);
                                break;
                        }
                    }
                }
            }
        })
}
async function task3(data, data1, data2, gzhao, co, cha, cha1, i) {
    let shuzu = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.0];
    let shuzu1 = [0.0, 0.5, 0.7, 0.6, 0.4, 0.3, 0.2, 0.9, 0.8, 0.1];
    let shuzu2 = [0.5, 0.6, 0.3, 0.2, 0.7, 0.8, 0.9, 0.1, 0.0, 0.4];
    let shuzu3 = [0.3, 0.3, 0.1, 0.1, 0.2, 0.3, 0.2, 0.1, 0.3, 0.2];
    let shuzu4 = [0.2, 0.2, 0.1, 0.1, 0.2, 0.2, 0.1, 0.1, 0.1, 0.2];
    let shuzu5 = [0.1, 0.2, 0.3, 0.1, 0.4, 0.2, 0.1, 0.3, 0.3, 0.1];
    let rad = stringRandom(1, { letters: false });
    switch (true) {
        case i >= 0 && i < 5:
            await yanshiy.create({
                machinekey: data,
                tair1: (parseFloat(data2.data1) + parseFloat(shuzu[rad])).toFixed(1), //温度1
                airhumidity1: data2.data2, //湿度1
                Soiltemp1: (parseFloat(data2.data1) + parseFloat(shuzu[rad])).toFixed(1), //土壤温度1
                soilmoisture1: data2.data2, //土壤湿度1
                soi1: Math.round(parseInt(gzhao)), //光照强度1
                co21: Math.round(parseInt(co)),
                tair2: (parseFloat(data2.data1) + parseFloat(shuzu1[rad])).toFixed(1), //温度2
                airhumidity2: data2.data2, //湿度2
                Soiltemp2: (parseFloat(data2.data1) + parseFloat(shuzu1[rad])).toFixed(1), //土壤温度2
                soilmoisture2: data2.data2, //土壤湿度2
                soi2: Math.round(parseInt(gzhao)),
                co22: Math.round(parseInt(co)),
                tair3: (parseFloat(data2.data1) + parseFloat(shuzu2[rad])).toFixed(1), //温度3
                airhumidity3: data2.data2, //湿度3
                Soiltemp3: (parseFloat(data2.data1) + parseFloat(shuzu2[rad])).toFixed(1), //土壤温度3
                soilmoisture3: data2.data2, //土壤湿度3
                soi3: Math.round(parseInt(gzhao)),
                co23: Math.round(parseInt(co)),
                time: data1,
            })
            break;
        case i >= 5 && i < 14:
            await yanshiy.create({
                machinekey: data,
                tair1: (parseFloat(data2.data1) + parseFloat(shuzu[rad])).toFixed(1), //温度1
                airhumidity1: data2.data2, //湿度1
                Soiltemp1: (parseFloat(data2.data1) + parseFloat(shuzu[rad])).toFixed(1), //土壤温度1
                soilmoisture1: data2.data2, //土壤湿度1
                soi1: Math.round(parseInt(gzhao) + parseInt(parseInt(cha) * parseFloat(shuzu3[rad]))), //光照强度1
                co21: Math.round(parseInt(co) + parseInt(parseInt(cha1) * parseFloat(shuzu3[rad]))),
                tair2: (parseFloat(data2.data1) + parseFloat(shuzu1[rad])).toFixed(1), //温度2
                airhumidity2: data2.data2, //湿度2
                Soiltemp2: (parseFloat(data2.data1) + parseFloat(shuzu1[rad])).toFixed(1), //土壤温度2
                soilmoisture2: data2.data2, //土壤湿度2
                soi2: Math.round(parseInt(gzhao) + parseInt(parseInt(cha) * parseFloat(shuzu4[rad]))),
                co22: Math.round(parseInt(co) + parseInt(parseInt(cha1) * parseFloat(shuzu4[rad]))),
                tair3: (parseFloat(data2.data1) + parseFloat(shuzu2[rad])).toFixed(1), //温度3
                airhumidity3: data2.data2, //湿度3
                Soiltemp3: (parseFloat(data2.data1) + parseFloat(shuzu2[rad])).toFixed(1), //土壤温度3
                soilmoisture3: data2.data2, //土壤湿度3
                soi3: Math.round(parseInt(gzhao) + parseInt(parseInt(cha) * parseFloat(shuzu5[rad]))),
                co23: Math.round(parseInt(co) + parseInt(parseInt(cha1) * parseFloat(shuzu5[rad]))),
                time: data1,
            })
            break;
        case i >= 14 && i < 20:
            await yanshiy.create({
                machinekey: data,
                tair1: (parseFloat(data2.data1) + parseFloat(shuzu[rad])).toFixed(1), //温度1
                airhumidity1: data2.data2, //湿度1
                Soiltemp1: (parseFloat(data2.data1) + parseFloat(shuzu[rad])).toFixed(1), //土壤温度1
                soilmoisture1: data2.data2, //土壤湿度1
                soi1: Math.round(parseInt(gzhao) - parseInt(parseInt(cha) * parseFloat(shuzu3[rad]))), //光照强度1
                co21: Math.round(parseInt(co) - parseInt(parseInt(cha1) * parseFloat(shuzu3[rad]))),
                tair2: (parseFloat(data2.data1) + parseFloat(shuzu1[rad])).toFixed(1), //温度2
                airhumidity2: data2.data2, //湿度2
                Soiltemp2: (parseFloat(data2.data1) + parseFloat(shuzu1[rad])).toFixed(1), //土壤温度2
                soilmoisture2: data2.data2, //土壤湿度2
                soi2: Math.round(parseInt(gzhao) - parseInt(parseInt(cha) * parseFloat(shuzu4[rad]))),
                co22: Math.round(parseInt(co) - parseInt(parseInt(cha1) * parseFloat(shuzu4[rad]))),
                tair3: (parseFloat(data2.data1) + parseFloat(shuzu2[rad])).toFixed(1), //温度3
                airhumidity3: data2.data2, //湿度3
                Soiltemp3: (parseFloat(data2.data1) + parseFloat(shuzu2[rad])).toFixed(1), //土壤温度3
                soilmoisture3: data2.data2, //土壤湿度3
                soi3: Math.round(parseInt(gzhao) - parseInt(parseInt(cha) * parseFloat(shuzu5[rad]))),
                co23: Math.round(parseInt(co) - parseInt(parseInt(cha1) * parseFloat(shuzu5[rad]))),
                time: data1,
            })
            break;
        case i >= 20 && i < 23:
            await yanshiy.create({
                machinekey: data,
                tair1: (parseFloat(data2.data1) + parseFloat(shuzu[rad])).toFixed(1), //温度1
                airhumidity1: data2.data2, //湿度1
                Soiltemp1: (parseFloat(data2.data1) + parseFloat(shuzu[rad])).toFixed(1), //土壤温度1
                soilmoisture1: data2.data2, //土壤湿度1
                soi1: Math.round(parseInt(gzhao)), //光照强度1
                co21: Math.round(parseInt(co)),
                tair2: (parseFloat(data2.data1) + parseFloat(shuzu1[rad])).toFixed(1), //温度2
                airhumidity2: data2.data2, //湿度2
                Soiltemp2: (parseFloat(data2.data1) + parseFloat(shuzu1[rad])).toFixed(1), //土壤温度2
                soilmoisture2: data2.data2, //土壤湿度2
                soi2: Math.round(parseInt(gzhao)),
                co22: Math.round(parseInt(co)),
                tair3: (parseFloat(data2.data1) + parseFloat(shuzu2[rad])).toFixed(1), //温度3
                airhumidity3: data2.data2, //湿度3
                Soiltemp3: (parseFloat(data2.data1) + parseFloat(shuzu2[rad])).toFixed(1), //土壤温度3
                soilmoisture3: data2.data2, //土壤湿度3
                soi3: Math.round(parseInt(gzhao)),
                co23: Math.round(parseInt(co)),
                time: data1,
            })
            break;
        case i === 23:
            await yanshiy.create({
                machinekey: data,
                tair1: (parseFloat(data2.data1) + parseFloat(shuzu[rad])).toFixed(1), //温度1
                airhumidity1: data2.data2, //湿度1
                Soiltemp1: (parseFloat(data2.data1) + parseFloat(shuzu[rad])).toFixed(1), //土壤温度1
                soilmoisture1: data2.data2, //土壤湿度1
                soi1: Math.round(parseInt(gzhao)), //光照强度1
                co21: Math.round(parseInt(co)),
                tair2: (parseFloat(data2.data1) + parseFloat(shuzu1[rad])).toFixed(1), //温度2
                airhumidity2: data2.data2, //湿度2
                Soiltemp2: (parseFloat(data2.data1) + parseFloat(shuzu1[rad])).toFixed(1), //土壤温度2
                soilmoisture2: data2.data2, //土壤湿度2
                soi2: Math.round(parseInt(gzhao)),
                co22: Math.round(parseInt(co)),
                tair3: (parseFloat(data2.data1) + parseFloat(shuzu2[rad])).toFixed(1), //温度3
                airhumidity3: data2.data2, //湿度3
                Soiltemp3: (parseFloat(data2.data1) + parseFloat(shuzu2[rad])).toFixed(1), //土壤温度3
                soilmoisture3: data2.data2, //土壤湿度3
                soi3: Math.round(parseInt(gzhao)),
                co23: Math.round(parseInt(co)),
                time: data1,
            })
            break;
    }
}

async function task5(data, data1, data2, gzhao, co, cha, cha1, i) {
    let shuzu = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.0];
    let shuzu1 = [0.0, 0.5, 0.7, 0.6, 0.4, 0.3, 0.2, 0.9, 0.8, 0.1];
    let shuzu2 = [0.5, 0.6, 0.3, 0.2, 0.7, 0.8, 0.9, 0.1, 0.0, 0.4];
    let shuzu3 = [0.3, 0.3, 0.1, 0.1, 0.2, 0.3, 0.2, 0.1, 0.3, 0.2];
    let shuzu4 = [0.2, 0.2, 0.1, 0.1, 0.2, 0.2, 0.1, 0.1, 0.1, 0.2];
    let shuzu5 = [0.1, 0.2, 0.3, 0.1, 0.4, 0.2, 0.1, 0.3, 0.3, 0.1];
    let rad = stringRandom(1, { letters: false });
    switch (true) {
        case i >= 0 && i < 5:
            await yanshiy.create({
                machinekey: data,
                tair1: (parseFloat(data2.data1) + parseFloat(shuzu[rad])).toFixed(1), //温度1
                airhumidity1: data2.data2, //湿度1
                Soiltemp1: (parseFloat(data2.data1) + parseFloat(shuzu[rad])).toFixed(1), //土壤温度1
                soilmoisture1: data2.data2, //土壤湿度1
                soi1: Math.round(parseInt(gzhao)), //光照强度1
                co21: Math.round(parseInt(co)),
                tair2: (parseFloat(data2.data1) + parseFloat(shuzu1[rad])).toFixed(1), //温度2
                airhumidity2: data2.data2, //湿度2
                Soiltemp2: (parseFloat(data2.data1) + parseFloat(shuzu1[rad])).toFixed(1), //土壤温度2
                soilmoisture2: data2.data2, //土壤湿度2
                soi2: Math.round(parseInt(gzhao)),
                co22: Math.round(parseInt(co)),
                tair3: (parseFloat(data2.data1) + parseFloat(shuzu2[rad])).toFixed(1), //温度3
                airhumidity3: data2.data2, //湿度3
                Soiltemp3: (parseFloat(data2.data1) + parseFloat(shuzu2[rad])).toFixed(1), //土壤温度3
                soilmoisture3: data2.data2, //土壤湿度3
                soi3: Math.round(parseInt(gzhao)),
                co23: Math.round(parseInt(co)),
                time: data1,
            })
            break;
        case i >= 5 && i < 14:
            await yanshiy.create({
                machinekey: data,
                tair1: (parseFloat(data2.data1) + parseFloat(shuzu[rad])).toFixed(1), //温度1
                airhumidity1: data2.data2, //湿度1
                Soiltemp1: (parseFloat(data2.data1) + parseFloat(shuzu[rad])).toFixed(1), //土壤温度1
                soilmoisture1: parseInt(data2.data2) - 3, //土壤湿度1
                soi1: Math.round(parseInt(gzhao) + parseInt(parseInt(cha) * parseFloat(shuzu3[rad]))), //光照强度1
                co21: Math.round(parseInt(co) + parseInt(parseInt(cha1) * parseFloat(shuzu3[rad]))),
                tair2: (parseFloat(data2.data1) + parseFloat(shuzu1[rad])).toFixed(1), //温度2
                airhumidity2: parseInt(data2.data2) - 8, //湿度2
                Soiltemp2: (parseFloat(data2.data1) + parseFloat(shuzu1[rad])).toFixed(1), //土壤温度2
                soilmoisture2: data2.data2, //土壤湿度2
                soi2: Math.round(parseInt(gzhao) + parseInt(parseInt(cha) * parseFloat(shuzu4[rad]))),
                co22: Math.round(parseInt(co) + parseInt(parseInt(cha1) * parseFloat(shuzu4[rad]) - 35)),
                tair3: (parseFloat(data2.data1) + parseFloat(shuzu2[rad])).toFixed(1), //温度3
                airhumidity3: data2.data2, //湿度3
                Soiltemp3: (parseFloat(data2.data1) + parseFloat(shuzu2[rad])).toFixed(1), //土壤温度3
                soilmoisture3: parseInt(data2.data2) - 4, //土壤湿度3
                soi3: Math.round(parseInt(gzhao) + parseInt(parseInt(cha) * parseFloat(shuzu5[rad]))),
                co23: Math.round(parseInt(co) + parseInt(parseInt(cha1) * parseFloat(shuzu5[rad]) - 12)),
                time: data1,
            })
            break;
        case i >= 14 && i < 20:
            await yanshiy.create({
                machinekey: data,
                tair1: (parseFloat(data2.data1) + parseFloat(shuzu[rad])).toFixed(1), //温度1
                airhumidity1: data2.data2, //湿度1
                Soiltemp1: (parseFloat(data2.data1) + parseFloat(shuzu[rad])).toFixed(1), //土壤温度1
                soilmoisture1: data2.data2, //土壤湿度1
                soi1: Math.round(parseInt(gzhao) - parseInt(parseInt(cha) * parseFloat(shuzu3[rad]))), //光照强度1
                co21: Math.round(parseInt(co) - parseInt(parseInt(cha1) * parseFloat(shuzu3[rad]))),
                tair2: (parseFloat(data2.data1) + parseFloat(shuzu1[rad])).toFixed(1), //温度2
                airhumidity2: data2.data2, //湿度2
                Soiltemp2: (parseFloat(data2.data1) + parseFloat(shuzu1[rad])).toFixed(1), //土壤温度2
                soilmoisture2: data2.data2, //土壤湿度2
                soi2: Math.round(parseInt(gzhao) - parseInt(parseInt(cha) * parseFloat(shuzu4[rad]))),
                co22: Math.round(parseInt(co) - parseInt(parseInt(cha1) * parseFloat(shuzu4[rad]))),
                tair3: (parseFloat(data2.data1) + parseFloat(shuzu2[rad])).toFixed(1), //温度3
                airhumidity3: data2.data2, //湿度3
                Soiltemp3: (parseFloat(data2.data1) + parseFloat(shuzu2[rad])).toFixed(1), //土壤温度3
                soilmoisture3: data2.data2, //土壤湿度3
                soi3: Math.round(parseInt(gzhao) - parseInt(parseInt(cha) * parseFloat(shuzu5[rad]))),
                co23: Math.round(parseInt(co) - parseInt(parseInt(cha1) * parseFloat(shuzu5[rad]))),
                time: data1,
            })
            break;
        case i >= 20 && i < 23:
            await yanshiy.create({
                machinekey: data,
                tair1: (parseFloat(data2.data1) + parseFloat(shuzu[rad])).toFixed(1), //温度1
                airhumidity1: data2.data2, //湿度1
                Soiltemp1: (parseFloat(data2.data1) + parseFloat(shuzu[rad])).toFixed(1), //土壤温度1
                soilmoisture1: data2.data2, //土壤湿度1
                soi1: Math.round(parseInt(gzhao)), //光照强度1
                co21: Math.round(parseInt(co)),
                tair2: (parseFloat(data2.data1) + parseFloat(shuzu1[rad])).toFixed(1), //温度2
                airhumidity2: data2.data2, //湿度2
                Soiltemp2: (parseFloat(data2.data1) + parseFloat(shuzu1[rad])).toFixed(1), //土壤温度2
                soilmoisture2: data2.data2, //土壤湿度2
                soi2: Math.round(parseInt(gzhao)),
                co22: Math.round(parseInt(co)),
                tair3: (parseFloat(data2.data1) + parseFloat(shuzu2[rad])).toFixed(1), //温度3
                airhumidity3: data2.data2, //湿度3
                Soiltemp3: (parseFloat(data2.data1) + parseFloat(shuzu2[rad])).toFixed(1), //土壤温度3
                soilmoisture3: data2.data2, //土壤湿度3
                soi3: Math.round(parseInt(gzhao)),
                co23: Math.round(parseInt(co)),
                time: data1,
            })
            break;
        case i === 23:
            await yanshiy.create({
                machinekey: data,
                tair1: (parseFloat(data2.data1) + parseFloat(shuzu[rad])).toFixed(1), //温度1
                airhumidity1: data2.data2, //湿度1
                Soiltemp1: (parseFloat(data2.data1) + parseFloat(shuzu[rad])).toFixed(1), //土壤温度1
                soilmoisture1: data2.data2, //土壤湿度1
                soi1: Math.round(parseInt(gzhao)), //光照强度1
                co21: Math.round(parseInt(co)),
                tair2: (parseFloat(data2.data1) + parseFloat(shuzu1[rad])).toFixed(1), //温度2
                airhumidity2: data2.data2, //湿度2
                Soiltemp2: (parseFloat(data2.data1) + parseFloat(shuzu1[rad])).toFixed(1), //土壤温度2
                soilmoisture2: data2.data2, //土壤湿度2
                soi2: Math.round(parseInt(gzhao)),
                co22: Math.round(parseInt(co)),
                tair3: (parseFloat(data2.data1) + parseFloat(shuzu2[rad])).toFixed(1), //温度3
                airhumidity3: data2.data2, //湿度3
                Soiltemp3: (parseFloat(data2.data1) + parseFloat(shuzu2[rad])).toFixed(1), //土壤温度3
                soilmoisture3: data2.data2, //土壤湿度3
                soi3: Math.round(parseInt(gzhao)),
                co23: Math.round(parseInt(co)),
                time: data1,
            })
            break;
    }
}
async function task4(shijian, wenshi, gzhao, fengsu, fengxiang) {
    let shuzu = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.0];
    let rad = stringRandom(1, { letters: false });
    await qixiangz.create({
        tair1: (parseFloat(wenshi.data1) + parseFloat(shuzu[rad])).toFixed(1), //温度1
        airhumidity1: wenshi.data2, //湿度1
        soi1: gzhao, //光照强度1
        fengxiang: fengxiang,
        fengsu: fengsu,
        time: shijian, //时间
    })

}

const plateInAuth = async (req, res, next) => {
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

router.post('/api/seachdata', async (req, res) => {
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

router.post('/api/seachdataOne', async (req, res) => {
    const adata = await yanshiy.findOne({ machinekey: req.body.machinekey }).sort({ "time": -1 })
    if (adata) {
        let pushdata = {
            'date': adata.time,
            'machinekey': adata.machinekey,
            value: [{
                name: 'tair1',
                data: adata.tair1,
                nikename: '空气温度1'
            },
            {
                name: 'airhumidity1',
                data: adata.airhumidity1,
                nikename: '空气湿度1'

            },
            {
                name: 'Soiltemp1',
                data: adata.Soiltemp1,
                nikename: '土壤温度1'
            },
            {
                name: 'soilmoisture1',
                data: adata.soilmoisture1,
                nikename: '土壤湿度1'
            },
            {
                name: 'soi1',
                data: adata.soi1,
                nikename: '光照强度1'
            },
            {
                name: 'co21',
                data: adata.co21,
                nikename: '1号CO2'
            },
            {
                name: 'tair2',
                data: adata.tair2,
                nikename: '空气温度2'
            },
            {
                name: 'airhumidity2',
                data: adata.airhumidity2,
                nikename: '空气湿度2'
            },
            {
                name: 'Soiltemp2',
                data: adata.Soiltemp2,
                nikename: '土壤温度2'
            },
            {
                name: 'soilmoisture2',
                data: adata.soilmoisture2,
                nikename: '土壤湿度2'
            },
            {
                name: 'soi2',
                data: adata.soi2,
                nikename: '光照强度2'
            },
            {
                name: 'co22',
                data: adata.co22,
                nikename: '2号CO2'
            },
            {
                name: 'tair3',
                data: adata.tair3,
                nikename: '空气温度3'
            },
            {
                name: 'airhumidity3',
                data: adata.airhumidity3,
                nikename: '空气湿度3'
            },
            {
                name: 'Soiltemp3',
                data: adata.Soiltemp3,
                nikename: '土壤温度3'
            },
            {
                name: 'soilmoisture3',
                data: adata.soilmoisture3,
                nikename: '土壤湿度3'
            },
            {
                name: 'soi3',
                data: adata.soi3,
                nikename: '光照强度3'
            },
            {
                name: 'co23',
                data: adata.co23,
                nikename: '3号CO2'
            },
            ]
        };
        res.send(pushdata);
    }
    else {
        res.send('error 403')
    }

})

router.post('/api/seach/qixiangzhan', async (req, res) => {
    const adata = await qixiangz.findOne({}).sort({ "time": -1 })
    res.send(adata)
})

router.post('/api/seachdata/qx24houer', async (req, res) => {
    const adata = await qixiangz.find({}).sort({ "time": 1 });
    let pushdataa = [];
    for (i = 0; i < adata.length; i++) {
        if (adata[i].time.split(' ')[1].split(':')[1] === '00') {
            pushdataa.push({
                date: adata[i].time,
                data: adata[i].tair1,
                nikename: '空气温度'
            }, {
                date: adata[i].time,
                data: adata[i].airhumidity1,
                nikename: '空气湿度'

            }, {
                date: adata[i].time,
                data: adata[i].fengsu,
                nikename: '风速'
            }, {
                date: adata[i].time,
                data: adata[i].fengxiang,
                nikename: '风向'
            }, {
                date: adata[i].time,
                data: adata[i].soi1,
                nikename: '光照强度1'
            })
        }
    }

    res.send(pushdataa);
})

    /*  let d =new Date()
      
 var formatDateTime = function (date) {  
                var y = date.getFullYear();  
                var m = date.getMonth() + 1;  
                m = m < 10 ? ('0' + m) : m;  
                var d = date.getDate();  
                d = d < 10 ? ('0' + d) : d;  
                var h = date.getHours();  
                h=h < 10 ? ('0' + h) : h;  
                var minute = date.getMinutes();  
                minute = minute < 10 ? ('0' + minute) : minute;  
                var second=date.getSeconds();  
                second=second < 10 ? ('0' + second) : second;  
                return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
            }; 
      console.log(formatDateTime(d)) */


router.post('/api/seachdata/24houer', async (req, res) => {
    const adata = await yanshiy.find({
        machinekey:req.body.machinekey,
        $and: [{ time: { $gt:  req.body.fdate } }, { time: { $lt:  req.body.sdate } }]
    })
 
    let y = parseInt(adata[0].time.split(' ')[1].split(':')[0])
    let pushdataa = [];
    let xzdate=[];
    let a = [];
    let a1 = [];
    let a2 = [];
    let a3 = [];
    let a4 = [];
    let a5 = [];
    let a6 = [];
    let a7 = [];
    let a8 = [];
    let a9 = [];
    let a10 = [];
    let a11 = [];
    let a12 = [];
    let a13 = [];
    let a14 = [];
    let a15 = [];
    let a16 = [];
    let a17 = [];

    for (i = 0; i < adata.length; i++) {
        if (adata[i].time.split(' ')[1].split(':')[1] === '00') {
            a.push(adata[i].tair1)
            a1.push(adata[i].airhumidity1)
            a2.push(adata[i].airhumidity1)
            a3.push(adata[i].soilmoisture1)
            a4.push(adata[i].soi1)
            a5.push(adata[i].co21)
            a6.push(adata[i].tair2)
            a7.push(adata[i].airhumidity2)
            a8.push(adata[i].airhumidity2)
            a9.push(adata[i].soilmoisture2)
            a10.push(adata[i].soi2)
            a11.push(adata[i].co22)
            a12.push(adata[i].tair3)
            a13.push(adata[i].airhumidity3)
            a14.push(adata[i].airhumidity3)
            a15.push(adata[i].soilmoisture3)
            a16.push(adata[i].soi3)
            a17.push(adata[i].co23)
            xzdate.push(adata[i].time)
            pushdataa.push({
                date: adata[i].time,
                data: adata[i].tair1,
                nikename: '空气温度1'
            }, {
                date: adata[i].time,
                data: adata[i].airhumidity1,
                nikename: '空气湿度1'

            }, {
                date: adata[i].time,
                data: adata[i].Soiltemp1,
                nikename: '土壤温度1'
            }, {
                date: adata[i].time,
                data: adata[i].soilmoisture1,
                nikename: '土壤湿度1'
            }, {
                date: adata[i].time,
                data: adata[i].soi1,
                nikename: '光照强度1'
            }, {
                date: adata[i].time,
                data: adata[i].co21,
                nikename: '1号CO2'
            }, {
                date: adata[i].time,
                data: adata[i].tair2,
                nikename: '空气温度2'
            }, {
                date: adata[i].time,
                data: adata[i].airhumidity2,
                nikename: '空气湿度2'
            }, {
                date: adata[i].time,
                data: adata[i].Soiltemp2,
                nikename: '土壤温度2'
            }, {
                ndate: adata[i].time,
                data: adata[i].soilmoisture2,
                nikename: '土壤湿度2'
            }, {
                date: adata[i].time,
                data: adata[i].soi2,
                nikename: '光照强度2'
            }, {
                date: adata[i].time,
                data: adata[i].co22,
                nikename: '2号CO2'
            }, {
                date: adata[i].time,
                data: adata[i].tair3,
                nikename: '空气温度3'
            }, {
                date: adata[i].time,
                data: adata[i].airhumidity3,
                nikename: '空气湿度3'
            }, {
                date: adata[i].time,
                data: adata[i].Soiltemp3,
                nikename: '土壤温度3'
            }, {
                date: adata[i].time,
                data: adata[i].soilmoisture3,
                nikename: '土壤湿度3'
            }, {
                date: adata[i].time,
                data: adata[i].soi3,
                nikename: '光照强度3'
            }, {
                date: adata[i].time,
                data: adata[i].co23,
                nikename: '3号CO2'
            })
        }
    }
    let biaodataa = [a, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17]
    res.send([pushdataa, biaodataa,xzdate]);
})


router.post('/api/seachdatahour', async (req, res) => {
    let timedata = new Date() //当时时间
    /*  let timedata1; //-1时
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

router.post('/api/seachdata/addvideo', plateInAuth, async (req, res) => {
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

router.post('/api/seachdata/oneseachvideo', plateInAuth, async (req, res) => {
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


router.post('/api/seachdata/seachvideo', plateInAuth, async (req, res) => {
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