const express = require('express')
const router = express.Router(); //新建路由
const { chartData } = require('../modb')

router.post('/api/chartdata/Treelist', async(req, res) => {
    const chdata1 = await chartData.updateOne({ adminname: 'admin' }, {
        formname: req.body.form.name,
        formregion: req.body.form.region,
        formdata1: req.body.form.date1,
        formdata2: req.body.form.date2,
        josnArry: req.body.form.arry
    })
})