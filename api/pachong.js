const express = require('express');
const router = express.Router(); //新建路由
const http = require('http');
const cheerio = require('cheerio');
const reptileUrl = "http://www.shuichan.cc/";
const reptiletqUrl = "http://www.weather.com.cn/weather/101190101.shtml";
const jiageUrl = "http://www.shuichan.cc/news_list.asp?action=&c_id=93&s_id=210&";
const iconv = require('iconv-lite');
const { ConnectionBase } = require('mongoose');
const { jiager } = require('../modb')

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

const tianqiw = (req, res, next) => {
    http.get(reptiletqUrl, (res) => {
        let length = 0;
        let arr = [];
        res.on("data", (chunk) => {
            arr.push(chunk);
            length += chunk.length;
        });
        res.on("end", () => {
            let data = Buffer.concat(arr, length);
            let change_data = iconv.decode(data, 'utf-8');
            req.dataa = change_data
            next()
        })
    })
}
/*  */
const hangqing = (req, res, next) => {
    let myDate = new Date();
    let datea = myDate.toLocaleDateString().split('-');
    http.get(jiageUrl, (res) => {
        let length = 0;
        let arr = [];
        res.on("data", (chunk) => {
            arr.push(chunk);
            length += chunk.length;
        });
        res.on("end", () => {
            
            let data = Buffer.concat(arr, length);
            const $ = cheerio.load(iconv.decode(data, 'gb2312'), { decodeEntities: false });
            let a = $("table[class='tablew'][cellspacing='0']").find('a').toArray();
            let regdata = `${datea[1]}\\u6708${datea[2]}\\u65e5\\u6c5f\\u82cf\\u82cf\\u5dde\\u5357\\u73af\\u6865\\u5e02\\u573a\\u6c34\\u4ea7\\u54c1\\u6279\\u53d1\\u4ef7\\u683c`
            let reg = eval("/" + regdata + "/");
            a.length = 15;
            let dizhi = null;
            a.forEach((item) => {
                let a0 = cheerio.load(item, { decodeEntities: false });
                let a0t = a0('a').text();
                let a0h = a0('a').attr('href');
                if (reg.test(a0t)) {
                    dizhi = a0h;
                }
            })
            if (dizhi) {
                http.get('http://www.shuichan.cc/' + dizhi, (res) => {
                    let length = 0;
                    let arr = [];
                    res.on("data", (chunk) => {
                        arr.push(chunk);
                        length += chunk.length;
                    });
                    res.on("end", () => {
                        let data = Buffer.concat(arr, length);
                        req.dataa = iconv.decode(data, 'gb2312');
                        req.date = datea;
                        req.boolvalue = true;
                        next();
                    })
                })
            }
            else {
                
                if(Number(datea[2])>0){
                    datea[2]-=1;
                    regdata = `${datea[1]}\\u6708${datea[2]}\\u65e5\\u6c5f\\u82cf\\u82cf\\u5dde\\u5357\\u73af\\u6865\\u5e02\\u573a\\u6c34\\u4ea7\\u54c1\\u6279\\u53d1\\u4ef7\\u683c`;
                    reg = eval("/" + regdata + "/");
                    a.forEach((item) => {
                        let a0 = cheerio.load(item, { decodeEntities: false });
                        let a0t = a0('a').text();
                        let a0h = a0('a').attr('href');
                        if (reg.test(a0t)) {
                            dizhi = a0h;
                        }
                    })
                    if (dizhi) {
                        http.get('http://www.shuichan.cc/' + dizhi, (res) => {
                            let length = 0;
                            let arr = [];
                          
                            res.on("data", (chunk) => {
                                arr.push(chunk);
                                length += chunk.length;
                            });
                            res.on("end", () => {
                                let data = Buffer.concat(arr, length);
                                req.dataa = iconv.decode(data, 'gb2312');
                                req.date = datea;
                                req.boolvalue = true;
                                next();
                            })
                        })
                    }
                    else{
                        req.boolvalue = false;
                        next();
                    }
                }
                else{
                    req.boolvalue = false;
                    next();
                }
            }
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
    let cc = [];
    let b = $('#tab_conbox9').find('ul').html()
    const vlau = cheerio.load(b, { decodeEntities: false })
    //vlau('li').find('em').remove()
    //console.log(vlau('li').html())
    vlau('li').each((i, v) => {
        vlau(v).find('em').remove();
        c[i] = vlau(v).find('a').attr('href');
        cc[i] = vlau(v).text();
    })
    let datalist = [];
    c.forEach((item, i) => {
        datalist.push({ href: item, name: cc[i] })
    })
    return res.send(
        datalist
    );
})

router.get('/api/pachongtianqi', tianqiw, (req, res) => {
    let lista = [];
    const $ = cheerio.load(req.dataa, { decodeEntities: false })
    let b = $('.c7d').find('.t').html()
    const vlau = cheerio.load(b, { decodeEntities: false })

    vlau('li').each((i, v) => {
        lista[i] = {
            date: vlau(v).find('h1').text(),
            icon: vlau(v).find('big').attr('class').replace("png40 ", ""),
            wea: vlau(v).find('.wea').text(),
            temp: vlau(v).find('.tem').text().replace(/[\r\n]/g, "")
        }
    })
    lista.length = 3;
    return res.send(lista);
})

router.get('/api/pachongshuichan', hangqing, async (req, res) => {
    //console.log('0')
    if (req.boolvalue) {
        //console.log('1')
        const $ = cheerio.load(req.dataa, { decodeEntities: false });
        let b = $('#cphRight_gvList').find('tr table').toArray();
        let datalist = [];
        b.forEach((item) => {
            const b2 = cheerio.load(item, { decodeEntities: false });
            let b3 = b2.text().replace(/[\t]/g, "").replace(/[\n]/g, "!").replace(/\!\!/g, "").split('!');
            b3.length = 5;
            b3.splice(1, 3);
            b3.unshift(req.date.join('-'))
            datalist.push(b3)
        })
        const date = await jiager.findOne({ date: req.date.join('-') })
        if (date) {
            return res.send(datalist)
        } else {
            await jiager.create({
                date: req.date.join('-'),
                data: datalist,
            })
            return res.send(datalist)
        }
    }
    else {
        //console.log('2')
        const date1 = await jiager.findOne({}).limit(-1);
        if (!date1) {
            return res.send({
                'msg': "获取失败",
                'status': 422
            })
        }
        return res.send(date1.data);
    }


})
module.exports = router;