const express = require('express')
const router = express.Router(); //新建路由
const { UserM } = require('../modb')
const { UserC } = require('../modb')
const { ProjectL } = require('../modb')
const { MachineKey } = require('../modb')
const jwt = require('jsonwebtoken')
const seckey = 'dsd' //tonken的密钥

//中间件name token解密
const Mauth = async(req, res, next) => {
        const raw = req.headers.authorization.split(' ').pop()
        const { username } = jwt.verify(raw, seckey)
        const username1 = { name: username }
        req.user = username1
        next()
    }
    //查询所有子账户
router.post('/api/user/MachineSchAll', Mauth, async(req, res) => {
        const resa = await UserM.find({ "AdminName": req.user.name, "projectnumb": req.body.data })
        if (!resa) {
            return res.send({
                "meta": {
                    'msg': "查询失败",
                    'status': 422
                }
            })
        }
        return res.send(resa);
    })
    //子用户对应设备
router.post('/api/user/MachineSchOne', Mauth, async(req, res) => {
        const resa = await UserM.find({ "AdminName": req.user.name, "projectnumb": pnumb.projectnumb, "nickname": req.body.data[3] })
        if (!resa) {
            return res.send({
                "meta": {
                    'msg': "查询失败",
                    'status': 422
                }
            })
        }
        return res.send(resa);
    })
    //查询对应设备
router.post('/api/user/MachineSchOne', Mauth, async(req, res) => {
        const pnumb = await ProjectL.findOne({ "username": req.user.name, 'platename': req.body.data[0], 'areaname': req.body.data[2] })
        if (pnumb) {
            const resa = await UserM.find({ "AdminName": req.user.name, "projectnumb": pnumb.projectnumb, "nickname": req.body.data[3] })
            if (!resa) {
                return res.send({
                    "meta": {
                        'msg': "查询失败",
                        'status': 422
                    }
                })
            }
            return res.send(resa);
        }

    })
    //查询子账户
router.post('/api/user/MachineSch', async(req, res) => {
        const resa = await UserM.findOne({ machinekey: req.body.machinekey })
        if (!resa) {
            return res.send({
                "meta": {
                    'msg': "查询失败",
                    'status': 422
                }
            })
        }
        return res.send(resa);
    })
    //设备注册
router.post('/api/user/Machineregister', Mauth, async(req, res) => {
        const UserMachine = await UserM.create({
            AdminName: req.user.name,
            machinekey: req.body.machinekey,
            nickname: req.body.nickname,
            state: req.body.state,
            sensorsNum: req.body.sensorsNum,
            deviceNum: req.body.deviceNum,
            Ip: req.body.Ip,
            networkType: req.body.networkType,
            networkState: req.body.networkState,
            error: req.body.error,
            Location: req.body.Location,
            inPin: req.body.inPin,
            outPin: req.body.outPin,
            projectnumb: req.body.data
        })
        if (!UserMachine) {
            return res.send({
                "meta": {
                    'msg': "注册失败",
                    'status': 422
                }
            })
        } else {
            const resa = await UserM.find({ "AdminName": req.user.name, "projectnumb": req.body.data })
            await ProjectL.updateOne({ "username": req.user.name, "projectnumb": req.body.data }, { 'areanumb': resa.length })
            return res.send({
                "meta": {
                    'msg': "注册成功",
                    'status': 200
                }
            });
        }
    })
    //设备修改
router.post('/api/user/MachineRevise', async(req, res) => {
        const resa = await UserM.findOne({ "nickname": req.body.nickname, "projectnumb": req.body.data });
        if (!resa) {
            return res.send({
                "meta": {
                    'msg': "查询失败",
                    'status': 422
                }
            })
        }
        resa.machinekey = req.body.machinekey
        const mkey = await MachineKey.findOne({ "machinekey": req.body.machinekey })
        mkey.keystate = true
        await mkey.save()
        await resa.save()
        return res.send({
            "meta": {
                'msg': "查询成功",
                'status': 200
            }
        });

    })
    //删除
router.post('/api/user/deletmachine', Mauth, async(req, res) => {

    const deletmachine = await UserM.deleteOne({ 'machinekey': req.body.machinekey })
    if (!deletmachine) {
        return res.send({
            "meta": {
                "msg": "删除失败",
                'statys': 300
            }
        })
    } else {
        const resaA = await UserM.find({ "AdminName": req.user.name, "projectnumb": req.body.projectnumb })

        await ProjectL.updateOne({ "username": req.user.name, "projectnumb": req.body.projectnumb }, { 'areanumb': resaA.length })
        await MachineKey.updateOne({ "machinekey": req.body.machinekey }, { "keystate": false })
        res.send({
            "meta": {
                "msg": "删除成功",
                'statys': 200
            }
        })
    }
})

module.exports = router;