const express = require('express');
const router = express.Router(); //新建路由
const http = require('http');
const cheerio = require('cheerio');
const reptileUrl = "http://www.shuichan.cc/";
const iconv = require('iconv-lite');

const qingqiu = (req, res, next) => {

    http.get(reptileUrl, (res) => {
        let length = 0;
        let arr = [];
        res.on("data", (chunk) => {
            arr.push(chunk);
            length += chunk.length;
        });
        res.on("end", () => {
            let data = Buffer.concat(arr, length);
            let change_data = iconv.decode(data, 'gb2312');
            req.dataa = change_data
            next()
        })
    })

}

router.get('/api/pachong', qingqiu, (req, res) => {
    const $ = cheerio.load(req.dataa, { decodeEntities: false })
    let onexinwen = [];
    onexinwen[0] = {
        href: $('#tab_conbox9').find('.big-tit ').find('a').attr('href'),
        title: $('#tab_conbox9').find('.big-tit ').find('a').text()
    }
    let c = [];
    let b = $('#tab_conbox9').find('ul').html()
    const vlau = cheerio.load(b, { decodeEntities: false })
    vlau('li').not('em').each((i, v) => {
        c[i] = vlau(v).html()
    })
    res.send(c);
})
module.exports = router;