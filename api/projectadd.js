const express = require('express');
const router = express.Router(); //新建路由
const jwt = require('jsonwebtoken')
const seckey = 'dsd' //tonken的密钥
const { User } = require('../modb')
const { porject } = require('../modb')
const { ProjectL } = require('../modb')

//通过token翻译用户名
const auth = async(req, res, next) => {
        const raw = req.headers.authorization.split(' ').pop()
        const { username } = jwt.verify(raw, seckey)
        req.user = await User.findOne({ username: username })
        req.numb = await ProjectL.find({ username: req.user.username }).sort({ projectnumb: -1 }).skip(0).limit(1);
        next()
    }
    //根据管理员账户添加项目
router.post('/api/project/addproject', auth, async(req, res) => {
        const data = await ProjectL.create({
            username: req.user.username,
            projectnumb: req.numb[0].projectnumb + 1,
            usernumb: 0,
            areanumb: 1,
            errornumb: 0,
            waringnumb: 0
        })
        await porject.create({
            username: req.user.username,
            projectnumb: req.numb[0].projectnumb + 1,
        })

        if (!data) return res.send({
            'msg': "添加失败",
            'status': 422
        });
        return res.send({
            "meta": {
                'msg': "添加成功",
                'status': 200
            }
        });
    })
    //搜索账户平台下所有项目
router.post('/api/project/searchproject', auth, async(req, res) => {
        const projecdata = await ProjectL.find({ 'username': req.user.username, "platename": req.body.platename })
        if (!projecdata) return res.send({
            'msg': "查询失败",
            'status': 422
        });
        return res.send({
            'data': projecdata,
            "meta": {
                'msg': "查询成功",
                'status': 200,
            }
        });
    })
    //搜索账户平台单个项目
router.post('/api/project/searchprojectOne', auth, async(req, res) => {

    const projecdata = await ProjectL.find({ 'username': req.user.username, "platename": req.body.platename, "areaname": req.body.areaname })
    if (projecdata.length==0){
        return res.send({
            'msg': "查询失败",
            'status': 422
        });
    } 
    else{
        return res.send({
            'data': projecdata,
            "meta": {
                'msg': "查询成功",
                'status': 200,
            }
    
        });
    }

})
module.exports = router;