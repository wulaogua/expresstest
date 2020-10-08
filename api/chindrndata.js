const express = require('express')
const router = express.Router(); //新建路由
const { UserC } = require('../modb')
const { UserM } = require('../modb')
const { porject } = require('../modb')
const { videolist } = require('../modb')
const jwt = require('jsonwebtoken')
const seckey = 'dsd' //tonken的密钥
//中间件name token解密
const Mauth = async (req, res, next) => {
    const raw = req.headers.authorization.split(' ').pop()
    const { username } = jwt.verify(raw, seckey)
    const username1 = { name: username }
    req.user = username1
    next()
}
//查询子用户信息
router.post('/api/user/userdata', Mauth, async (req, res) => {
    const resa = await UserC.findOne({ "username": req.user.name })
    if (resa) {
        const resb = await UserM.find({
            "AdminName": resa.adminnmae,
            "projectnumb": resa.projectnumb,
            "nickname": { "$in": resa.areadatarights }
        })
        if (resb.length != 0) {
            return res.send(resb);
        }
        else {
            return res.send({
                "meta": {
                    'msg': "查询失败",
                    'meta': 301
                }
            })
        }
    }
    else{
        return res.send({
            "meta": {
                'msg': "查询失败",
                'meta': 301
            }
        })
    }
})

router.post('/api/user/uservideo', Mauth, async (req, res) => {
    const resc = await UserC.findOne({ "username": req.user.name })
    if (resc) {
        let videodata = [];
        const data = await videolist.findOne({ adminname: resc.adminnmae, projectnumb: resc.projectnumb });
        for (let i = 0; i < resc.areacontrolarights.length; i++) {
            for (let y = 0; y < data.videourl.length; y++) {
                if (data.videourl[y].channelName === resc.areacontrolarights[i]) {
                    videodata.push({
                        nikenmae: data.videourl[y].channelName,
                        picUrl: data.videourl[y].picUrl
                    })
                }
            }
        }
        return res.send(videodata)
    }
    else {
        return res.send({
            "meta": {
                'msg': "查询失败",
                'meta': 301
            }
        })
    }
})


router.post('/api/user/userdatak', Mauth, async (req, res) => {
    const resc = await UserC.findOne({ "username": req.user.name })
    if (!resc) {
        if (req.body.platedata === 3) {
            const prodata = await porject.findOne({ "username": req.user.name, "platename": req.body.payload[0], "projectname": req.body.payload[2] })
            const resd = await UserM.find({
                "AdminName": req.user.name,
                "projectnumb": prodata.projectnumb,
                "nickname": req.body.payload[3],
            })
            if (resd.length!=0) {
                return res.send({
                    resd,
                    "meta": {
                        'msg': "获取成功",
                        'meta': 200
                    }
                });
            }
            return res.send({
                "meta": {
                    'msg': "更新失败",
                    'meta': 422
                }
            })
        }
        else {
            const resd = await UserM.find({
                "AdminName": req.user.name,
                "projectnumb": req.body.projectnumb,
            })
            if (resd.length!=0) {
                return res.send({
                    resd,
                    "meta": {
                        'msg': "获取成功",
                        'meta': 200
                    }
                });
            }
            return res.send({
                "meta": {
                    'msg': "获取失败",
                    'meta': 422
                }
            })
        }

    } else {
        const resd = await UserM.find({
            "AdminName": resc.adminnmae,
            "projectnumb": resc.projectnumb,
            "nickname": { "$in": resc.areacontrolarights }
        })
        if (resd.length!=0) {
            return res.send({
                resd,
                "meta": {
                    'msg': "获取成功",
                    'meta': 200
                }
            });
        } else {
            return res.send({
                "meta": {
                    'msg': "获取失败",
                    'meta': 422
                }
            })
        }
    }


})

module.exports = router;