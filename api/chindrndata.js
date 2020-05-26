const express = require('express')
const router = express.Router(); //新建路由
const { UserC } = require('../modb')
const { UserM } = require('../modb')

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
    console.log(resa.areadatarights)
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

module.exports = router;