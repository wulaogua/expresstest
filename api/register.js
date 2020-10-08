const express = require('express');
const router = express.Router(); //新建路由
const { User } = require('../modb')

router.post('/api/register',(req, res) => {
  User.create({
            username: req.body.username,
            password: req.body.password,
            tal: req.body.tal,
            machinekey: req.body.machinekey,
            Jurisdiction: "admin"
        },(err)=>{
            if(!err){
                return res.send({
                    "meta": {
                        'msg': "注册成功",
                        'status': 200
                    }
                });
            }
           return res.send({
                "meta": {
                    'msg': "注册失败",
                    'status': 422
                }
            })
        })
});

module.exports = router;