const express = require('express');
const router = express.Router(); //新建路由
const { sensorA } = require('../modb')


router.post('/api/seachdata', async(req, res) => {
    const adata = await sensorA.find().sort({ "time": -1 }).limit(1)
    res.send(adata);
})

module.exports = router;