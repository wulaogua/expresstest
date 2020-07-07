const express = require('express');
const router = express.Router(); //新建路由
const { porject } = require('../modb')
const { ProjectL } = require('../modb')
const jwt = require('jsonwebtoken')
const seckey = 'dsd' //tonken的密钥
    //中间件name token解密
const auth = async(req, res, next) => {
        const raw = req.headers.authorization.split(' ').pop()
        const { username } = jwt.verify(raw, seckey)
        req.user = await porject.findOne({ username: username })
        next()
    }
    //修改
router.post('/api/register/project', auth, async(req, res) => {
    const project = await porject.findOne({ "username": req.user.username, "projectnumb": req.body.data })
    if (!project) {
        return res.send({
            "meta": {
                'msg': "提交失败",
                'status': 422
            }
        })
    }
    project.projectname = req.body.projectName
    project.comnpanyname = req.body.companyName
    project.companaddr = req.body.companyAddress
    project.companfex = req.body.companyFax
    project.compantal = req.body.companyTal
    project.projectintr = req.body.projectSuggest
    await project.save();

    await project.updateOne({ "username": req.user.username, "projectnumb": req.body.data }, { "projectname": req.body.projectName })
    return res.send({
        "meta": {
            'msg': "提交成功",
            'status': 200
        }
    });
});
/* //增加
router.post('/api/register/projectAdd', auth, async(req, res) => {
    const projectdetails = await porject.create({
        projectnumb: req.body.projectnumb,
        projectname: req.body.projectName,
        comnpanyname: req.body.companyName,
        companaddr: req.body.companyAddress,
        companfex: req.body.companyFax,
        compantal: req.body.companyTal,
        projectintr: req.body.projectSuggest,
    })
    if (!projectdetails) {
        return res.send({
            "meta": {
                'msg': "提交失败",
                'status': 422
            }
        });
    } else {
        return res.send({
            "meta": {
                'msg': "提交成功",
                'status': 200
            }
        });
    }

}); */

module.exports = router;