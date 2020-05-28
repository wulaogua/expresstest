const express = require('express');
const router = express.Router(); //新建路由
const { deviced } = require('../modb')

async function randadd(data) {
    let namelist = ['控制1', '控制2', '控制3', '控制4', '控制5', '控制6', '控制7', '控制8'];
    let idlist = ['reg00001', 'reg00002', 'reg00003', 'reg00004', 'reg00005', 'reg00006', 'reg00007', 'reg00008'];
    let boolenlist = [true, false, true, false, false, true, false, true, true, false, false];
    let rdatlist = [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2];
    let rdatlist1 = [2, 3, 1, 2, 3, 1, 2, 3, 1, 3, 2];
    let rdatlist2 = [3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1]
    for (let i = 0; i < 8; i++) {
        let randdata = Math.ceil(Math.random() * 10); //生成1-10
        const deviceadd = await deviced.create({
            devicename: namelist[i], //设备名
            id: idlist[i], //设备ID
            power: boolenlist[randdata], //设备电源指示
            remote: boolenlist[randdata], //设备远程指示
            status: rdatlist[randdata], //设备状态指示
            Nvalue: rdatlist1[randdata], //可调的数值
            value: rdatlist2[randdata], //三种设备状态
            voltage: '380V', //电压
            ec: `${randdata}A`, //电流
            devicekey: data, //绑定的设备KEY
        })
    }

}



router.post('/api/device/search', async(req, res) => {
    const adata = await deviced.find({ "devicekey": req.body.machinekey })
    if (adata) {
        return res.send({
            adata
        });
    }
})

router.post('/api/device/updata', async(req, res) => {
    const bdata = await deviced.update({ "devicekey": req.body.machinekey, "id": req.body.id }, {
        status: req.body.status,
        Nvalue: req.body.Nvalue
    })
    if (bdata.nModified != 1) {
        console.log('1', bdata.nModified)
        res.send({
            "meta": {
                'msg': "更新失败",
                'status': 422
            }
        })
    } else {
        const cdata = await deviced.findOne({ "devicekey": req.body.machinekey, "id": req.body.id })
        if (cdata) {
            res.send({
                data: { "status": cdata.status, Nvalue: cdata.Nvalue },
                meta: {
                    'msg': "更新成功",
                    'status': 200
                }
            })
        }
    }
})

router.post('/api/device/add', async(req, res) => {
    let macdata = "FX53"
    randadd(macdata)
})
module.exports = { router, randadd };