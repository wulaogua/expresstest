const express = require('express');
const { porject } = require('../modb');
const router = express.Router(); //新建路由
var multer = require('multer'); //文件获取储存的第三方模块
const fs = require('fs');
const path = require('path');
var upload = multer({ dest: '../usericon/' }); //将头像临时文件夹
var type, name, filename
const jwt = require('jsonwebtoken')
const seckey = 'dsd' //tonken的密钥

//中间件name token解密
const auth = async(req, res, next) => {
    /* console.log(req.headers.token) */
    const raw = req.headers.token
    const { username } = jwt.verify(raw, seckey)
    req.user = await porject.findOne({ username: username })
    next()
}

router.post('/api/usericon', upload.single('usericon'), auth, (req, res) => { //路由地址
    //读取传输的头像
    fs.readFile(req.file.path, async(err, data) => {
        if (err) {
            throw ('Load_Err');
        }
        type = req.file.mimetype.split('/')[1]; //获取文件类型名
        name = new Date().getTime() + parseInt(Math.random() * Math.random() * 1000000); //使用时间戳和随机数生成随机名，并且连成完整的文件名
        //保存文件至savePic文件夹
        filename = name + '.' + type;
        fs.writeFile(path.join(__dirname, '../savePic/' + filename), data, (err) => {
            // 返回信息给前端
            if (err) {
                //15312601518 
                res.send({
                    "meta": {
                        'msg': "上传失败",
                        'status': 420
                    }
                });
                //保存图片后删除临时文件
                fs.unlink(req.file.path, (err) => {
                    if (err) {
                        console.log('删除失败');
                    }
                });
                return;
            }
            res.send({
                data: 'savePic/' + filename,
                "meta": {
                    'msg': "注册成功",
                    'status': 200
                }
            });

            //保存图片后删除临时文件
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.log('删除失败');
                }
            });
        });
        //写入数据库,
        const prjicon = await porject.findOne({ "username": req.user.username, "projectnumb": req.user.projectnumb });

        prjicon.usericonadder = "127.0.0.1:4000" + "/" + "api" + "/" + "savePic" + "/" + filename;
        await prjicon.save()
    });

});


module.exports = router;