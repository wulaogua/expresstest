const express = require('express');
const router = express.Router(); //新建路由
const { User } = require('../modb')
const { UserC } = require('../modb')
const jwt = require('jsonwebtoken')
const seckey = 'dsd'
router.post('/api/login', async(req, res) => {
    const user = await User.findOne({ username: req.body.username})
     //子用户登录
    if (!user) {
        //无账户报错
        const userc = await UserC.findOne({ username: req.body.username })
        if (!userc) {
            return res.send({
                "meta": {
                    'msg': "登陆失败",
                    'status': 422
                }
            })
        } 
        else 
        {
             const  usercc = await UserC.findOne({ username: req.body.username })
               const isPasswordValid = require('bcryptjs').compareSync(
                       req.body.password,
                       usercc.password
                   )
                   //密码错误判断
               if (!isPasswordValid) {
                   return res.status(422).send({
                       message: "密码错误"
                   })
               } 
               else 
               {
                   const tokenq = jwt.sign({ username: usercc.username }, seckey)
                   res.send({
                       'username': usercc.username,
                       'token': tokenq,
                       'Jurisdiction': 'user',
                       "meta": {
                           'msg': "登陆成功",
                           'status': 200
                       }
                   })
               }
        }
    }
    //主账户登录
     else {
        const isPasswordValid = require('bcryptjs').compareSync(
                req.body.password,
                user.password
            )
            //密码错误判断
        if (!isPasswordValid) {
            return res.status(422).send({
                message: "密码错误"
            })
        }
        //生成token
        //sign（payload需要操作的数据
        //        seckey 密钥）
        const token = jwt.sign({ username: user.username }, seckey)
            /* res.send({ user, token: token,'status':'200'}) */
        res.send({
            'id': user._id,
            'username': user.username,
            'tal': user.tal,
            'token': token,
            "meta": {
                'msg': "登陆成功",
                'status': 200
            }
        })
    }
});


module.exports = router;