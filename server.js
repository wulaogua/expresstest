const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const seckey = 'dsd' //tonken的密钥

const { User } = require('./modb')
const { MachineKey } = require('./modb')
const { porject } = require('./modb')
const { UserC } = require('./modb')
const { ProjectL } = require('./modb')
const { sensorA } = require('./modb')




const login = require('./api/login.js');
const registerNameSch = require('./api/registerNameSch.js')
const register = require('./api/register.js')
const { router: devicedata } = require('./api/devicedata.js')
const keysch = require('./api/keysch.js')
const keyadd = require('./api/keyadd.js')
const projectadd = require('./api/projectadd.js')
const userIcon = require('./api/userIcon')
const projectinr = require('./api/projectinr')
const deletuser = require('./api/deletuser')
const updatachilden = require('./api/updatachilden')
const addchildrenusers = require('./api/addchildrenusers')
const usermachinelist = require('./api/usermachinelist')
const { router: seachdata } = require('./api/seachdata')
const { fucnc1: fucnc1 } = require('./api/seachdata')
const chindrndata = require('./api/chindrndata')
const chartdata = require('./api/chartdata')
const zonggai = require('./api/zonggai')
const pachong = require('./api/pachong')

////////
fucnc1();
///////////
//websokcettest///////////////////
Math.ceil(Math.random() * 10);
/////
var server = require('http').createServer(app).listen(8202);
var io = require('socket.io')(server);
io.on('connection', function (socket) {
    // 向客户端传递消息
    // 接收并处理客户端的hi事件
    socket.on('start', function (data) {
        // ....
        console.log(data)
        socket.emit('news', { hello: 'hello' })
    })
    // 断开事件
    socket.on('disconnect', function (data) {
        console.log('断开通话');
        //socket.emit('c_leave','离开');
        //socket.broadcast用于向整个网络广播(除自己之外)
        //socket.broadcast.emit('c_leave','某某人离开了')
    })
}); //

//websokcettest///////////////////
//中间件修改机器码状态
const keyAuth = async (req, res, next) => {
    const mkey = await MachineKey.findOne({ machinekey: req.body.machinekey })
    mkey.keystate = true
    await mkey.save()
    req.key = mkey
    next()
}
//中间件name token解密
const auth = async (req, res, next) => {
    const raw = req.headers.authorization.split(' ').pop()
    const { username } = jwt.verify(raw, seckey)
    const data = await User.findOne({ username: username })
    if (!data) {
        const dataa = await UserC.findOne({ username: username })
        if (!dataa) {
            req.user = "查询错误"
        } else {
            req.user = dataa
            next()
        }
    } else {
        req.user = data
        next()
    }
}
app.use(express.json())
app.use(require('cors')());
app.use('/', express.static('public'))
//获取所有用户
app.get('/api/users', async (req, res) => {
    const users = await User.find()
    res.send(users);
});
//获取heard token 中nam
app.get('/api/profile', auth, async (req, res) => {
    res.send(req.user);
});
//设备ket状态修改
app.post('/api/machinekey/state', keyAuth, async (req, res) => {
    res.send(req.key);
});
//设备KEY全部查询
app.get('/api/machinekey', async (req, res) => {
    const machinekey = await MachineKey.find()
    res.send(machinekey);
});
//Heard ICON
app.get('/api/savePic/:name', async (req, res) => {
    res.sendFile(__dirname + "/" + "savePic" + "/" + req.params.name)
});

//获取记录
app.post('/api/projectinr', auth, async (req, res) => {
    const projectinr = await porject.find({ "username": req.user.username, "projectnumb": req.body.data })
    if (projectinr.length!=0) {
        return res.send(projectinr);
    }
    else {
        return res.send({
            "meta": {
                'msg': "获取失败",
                'status': 422
            }
        })
    }

});
//子用户查询全部查询
app.get('/api/user/childuser/all', async (req, res) => {
    const childuser = await UserC.find()
    res.send(childuser);
});
//读取管理员账户下的所有子账户
app.post('/api/user/childuser', auth, async (req, res) => {
    const childuser = await UserC.find({ "adminnmae": req.user.username, "projectnumb": req.body.data });
    if (!childuser) {
        res.send({
            "meta": {
                'msg': "读取失败",
                'status': 422
            }
        })
    }
    res.send(childuser);
});
//通过username查询子账户
app.post('/api/user/child', async (req, res) => {
    const child = await UserC.find({ "username": req.body.name, "projectnumb": req.body.data })

    if (!child) {
        res.send({
            "meta": {
                'msg': "读取失败",
                'status': 422
            }
        })
    }
    res.send(child);
})
//获取权限
//获取role
app.get('/api/user/role', auth, async (req, res) => {
    res.send(req.user.Jurisdiction)
});
//注册前用户名重复测试
app.use(registerNameSch)
//设备ket添加
app.use(keyadd)
//设备KEY查询
app.use(keysch)
//注册
app.use(register);
//登陆
app.use(login);
//添加头像
app.use(userIcon);
//添加详情
app.use(projectinr);
//子用户添加
app.use(addchildrenusers);
//删除子账户
app.use(deletuser);
//修改子账户
app.use(updatachilden)
//添加设备
app.use(usermachinelist)
//查询项目状态
app.use(projectadd)
///查询传感器数据
app.use(seachdata)
//总概随机数
app.use(zonggai)
///设备数据
app.use(devicedata)
/////
app.use(chindrndata)
//
app.get('/api/seachdata', async (req, res) => {
    const adata = await sensorA.find().sort({ "time": -1 }).limit(1)
    res.send(adata);
})
///chart数据
app.use(chartdata)
///爬虫
app.use(pachong)
////
app.listen(4000, () => {
    console.log('App listening on port 4000!');
});