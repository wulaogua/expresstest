const express = require('express')
const { UserC } = require('../modb')
const router = express.Router(); //新建路由

router.post('/api/user/updatachlidren', async(req, res) => {
    //子用户更新
    const updatachildren = await UserC.updateOne({ 'username': req.body.ouserame, 'projectnumb': req.body.data }, {
        username: req.body.newdata.name,
        password: req.body.newdata.password,
        areadatarights: req.body.newdata.checkeduseris,
        areacontrolarights: req.body.newdata.checkeduserisO,
    })

    if (!updatachildren) {
        return res.send({
            'msg': "修改失败",
            'status': 422
        })
    }
    return res.send({
        "meta": {
            'msg': "修改成功",
            'status': 200
        }
    });
})

module.exports = router;