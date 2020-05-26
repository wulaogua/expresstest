const express = require('express')
const { ProjectL } = require('../modb')
const { User } = require('../modb')
const { UserC } = require('../modb')
const jwt = require('jsonwebtoken')
const seckey = 'dsd' //tonken的密钥
const router = express.Router(); //新建路由

//中间件name token解密
const dauth = async(req, res, next) => {
    const raw = req.headers.authorization.split(' ').pop()
    const { username } = jwt.verify(raw, seckey)
    req.user = await User.findOne({ username: username })
    next()
}

router.post('/api/user/deletchlidren',dauth,async(req, res) => {
    const delechildren = await UserC.deleteOne({'username': req.body.nanme,'projectnumb':req.body.data})
    if (!delechildren) {
        return res.send({
            'msg': "删除失败",
            'status': 422
        })
    }
    else{
    const usernumb= await UserC.find({'adminnmae':req.user.username,'projectnumb':req.body.data})
    await ProjectL.updateOne({'username':req.user.username,'projectnumb':req.body.data},{ 'usernumb': usernumb.length })
    return res.send({
        "meta": {
            'msg': "删除成功",
            'status': 200
        }
    });
}
})

module.exports = router;