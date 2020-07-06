const express = require('express');
const router = express.Router(); //新建路由
const superagent = require('superagent');
const cheerio = require('cheerio');
const reptileUrl = "http://www.shuichan.cc/";

router.get('/api/pachong', async(req, res) => {
    const data = await superagent.get(reptileUrl).catch((err) => {
        console.log(err)
    })
    res.send(data);
})



module.exports = router;