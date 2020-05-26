const express = require('express');
const router = express.Router();//新建路由
const { MachineKey } = require('../modb')
router.get('/api/machinekey/:id', async (req, res) => {
    const mkey = await MachineKey.findOne({machinekey:req.params.id})
    if(!mkey){
       return res.send({
        "meta":{
            'msg': "序列号不存在1",
            'status':422
            }
       }); 
    }
    if(mkey.keystate){
        return res.send({
            "meta":{
                'msg': "序列号不存在2",
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