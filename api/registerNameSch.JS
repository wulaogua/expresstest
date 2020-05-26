const express = require('express');
const router = express.Router();//新建路由
const { User } = require('../modb')

router.get('/api/users/:id', async (req, res) => {
    const users = await User.findOne({username:req.params.id})
    if(users){
       return res.send({
        "meta":{
            'msg': "用户名重复",
            'status':422
            }
       }); 
    }
    res.send({
        "meta":{
            'msg': "验证成功",
            'status':200
            }
    });
});

module.exports = router;