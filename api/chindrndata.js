const express = require('express')
const router = express.Router(); //新建路由
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
router.post('/api/user/userdata', Mauth, async(req, res) => {
    const resa = await UserC.findOne({ "username": req.user.name })
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

module.exports = router;