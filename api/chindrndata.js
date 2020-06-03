const express = require('express')
const router = express.Router(); //新建路由
const { UserC } = require('../modb')
const { UserM } = require('../modb')
const { porject } = require('../modb')

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
    //查询子用户信息
router.post('/api/user/userdata', Mauth, async(req, res) => {
    const resa = await UserC.findOne({ "username": req.user.name })
    if (resa) {
        const resb = await UserM.find({
            "AdminName": resa.adminnmae,
            "projectnumb": resa.projectnumb,
            "nickname": { "$in": resa.areadatarights }
        })
        if (resb) {
            return res.send(resb);
        }
    }
})

router.post('/api/user/userdatak', Mauth, async(req, res) => {
    const resc = await UserC.findOne({ "username": req.user.name })
    if (!resc) {
        if (req.body.platedata === 3) {
            const prodata = await porject.findOne({ "username": req.user.name, "platename": req.body.payload[0], "projectname": req.body.payload[2] })
            const resd = await UserM.find({
                "AdminName": req.user.name,
                "projectnumb": prodata.projectnumb,
                "nickname": req.body.payload[3],
            })
            if (resd) {
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
                    'meta': 4222
                }
            })
        } else {
            const resd = await UserM.find({
                "AdminName": req.user.name,
                "projectnumb": req.body.projectnumb,
            })
            if (resd) {
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
                    'meta': 4222
                }
            })
        }

    } else {
        const resd = await UserM.find({
            "AdminName": resc.adminnmae,
            "projectnumb": resc.projectnumb,
            "nickname": { "$in": resc.areacontrolarights }
        })
        if (resd) {
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
                    'msg': "更新失败",
                    'meta': 422
                }
            })
        }

    }


})

module.exports = router;