const express = require('express');
const router = express.Router(); //新建路由
const { User } = require('../modb')
const { UserM } = require('../modb')
const { MachineKey } = require('../modb')
const { porject } = require('../modb')
const { ProjectL } = require('../modb')
const { chartData } = require('../modb')
const keyAuth = async(req, res, next) => {
    const mkey = await MachineKey.findOne({ machinekey: req.body.machinekey })
    mkey.keystate = true
    await mkey.save()
    req.key = mkey
    next()
}

router.post('/api/register', keyAuth, async(req, res) => {
    const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            tal: req.body.tal,
            machinekey: req.body.machinekey,
            Jurisdiction: "admin"
        })
        /*    await porject.create({
               username: req.body.username,
               projectnumb: 1,
           })
           await ProjectL.create({
               username: req.body.username,
               projectnumb: 1,
               usernumb: 0,
               areanumb: 1,
               errornumb: 0,
               waringnumb: 0
           }) */
        /* await UserM.create({
        AdminName: req.body.username,
        machinekey: req.body.machinekey,
        nickname: "片区一",
        projectnumb: 1,
    })
 */


    if (!user) {
        return res.send({
            "meta": {
                'msg': "注册失败",
                'status': 422
            }
        })
    }
    return res.send({
        "meta": {
            'msg': "注册成功",
            'status': 200
        }
    });
});

module.exports = router;