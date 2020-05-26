const express = require('express');
const router = express.Router(); //新建路由
const { User } = require('../modb')
const { ProjectL } = require('../modb')
const { UserC } = require('../modb')
const jwt = require('jsonwebtoken')
const seckey = 'dsd' //tonken的密钥


//中间件name token解密
const Cauth = async(req, res, next) => {
        const raw = req.headers.authorization.split(' ').pop()
        const { username } = jwt.verify(raw, seckey)
        req.user = await User.findOne({ username: username })
        next()
    }
    //注册子用户
router.post('/api/user/childregister', Cauth, async(req, res) => {
        const UserChildrens = await UserC.create({
            adminnmae: req.user.username,
            username: req.body.name,
            password: req.body.password,
            areadatarights: req.body.checkeduseris,
            areacontrolarights: req.body.checkeduserisO,
            phone: req.body.phone,
            Jurisdiction: "user",
            projectnumb: req.body.data
        })
        if (!UserChildrens) {
            return res.send({
                "meta": {
                    'msg': "注册失败",
                    'status': 422
                }
            })
        } else {
            const usernumb = await UserC.find({ 'adminnmae': req.user.username, 'projectnumb': req.body.data })
            await ProjectL.updateOne({ 'username': req.user.username, 'projectnumb': req.body.data }, { 'usernumb': usernumb.length })
            return res.send({
                "meta": {
                    'msg': "注册成功",
                    'status': 200
                }
            });
        }
    })
    //通过req.heard token获取对应的adminusername
    //获取req data 中的用户名、密、权限添加用户
module.exports = router;