const express = require('express');
const router = express.Router();//新建路由
const { MachineKey } = require('../modb')

router.post('/api/machinekey', async (req, res) => {
    const mkey = await MachineKey.create({
        machinekey: req.body.machinekey,
        keystate:req.body.keystate
    })
    if(!mkey){return res.send({
        "meta":{
            'msg': "添加失败",
            'status':422
            }
    })}
    return res.send({
        "meta":{
            'msg': "添加成功",
            'status':200
            }
    });
});

module.exports = router;