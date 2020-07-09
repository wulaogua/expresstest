const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://127.0.0.1:27017/express-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: {
        type: String,
        set(val) {
            return require('bcryptjs').hashSync(val, 10)
        }
    },
    tal: { type: String },
    machinekey: { type: String, unique: true },
    Jurisdiction: { type: String },
})

const ProjectList = new mongoose.Schema({
    platename: { type: String },
    projectnumb: { type: Number },
    username: { type: String },
    usernumb: { type: Number },
    areanumb: { type: Number },
    errornumb: { type: Number },
    waringnumb: { type: Number },
    areaname: { type: String },
    platenumb: { type: Number },
    appkey: { type: String },
    secret: { type: String },
    accessToken: { type: String },
})


const UserChildren = new mongoose.Schema({
    adminnmae: { type: String },
    username: { type: String, unique: true },
    password: {
        type: String,
        set(val) {
            return require('bcryptjs').hashSync(val, 10)
        }
    },
    areadatarights: { type: Object },
    areacontrolarights: { type: Object },
    Jurisdiction: { type: String },
    projectnumb: { type: Number },
    phone: { type: String, unique: true }
})

const KeySchema = new mongoose.Schema({
    machinekey: { type: String, unique: true },
    keystate: { type: Boolean }
})

const porjectSchema = new mongoose.Schema({
    platename: { type: String },
    username: { type: String },
    usericonadder: { type: String },
    projectname: { type: String },
    comnpanyname: { type: String },
    companaddr: { type: String },
    companfex: { type: String },
    compantal: { type: String },
    projectintr: { type: String },
    projectnumb: { type: Number },
    platenumb: { type: Number },
})

const deviceData = new mongoose.Schema({
    devicename: { type: String }, //设备名
    id: { type: String }, //设备ID
    power: { type: Boolean }, //设备电源指示
    remote: { type: Boolean }, //设备远程指示
    status: { type: Number }, //设备状态指示
    Nvalue: { type: Number }, //可调的数值
    value: { type: Number }, //三种设备状态
    voltage: { type: String }, //电压
    ec: { type: String }, //电流
    devicekey: { type: String }, //绑定的设备KEY
})

const userMachine = new mongoose.Schema({
        AdminName: { type: String },
        machinekey: { type: String },
        platename: { type: String },
        nickname: { type: String },
        state: { type: String },
        sensorsNum: { type: String },
        deviceNum: { type: String },
        Ip: { type: String },
        networkType: { type: String },
        networkState: { type: String },
        error: { type: String },
        Location: { type: String },
        inPin: { type: Array }, //
        outPin: { type: Array }, //
        projectnumb: { type: Number }, //
    })
    /* -------------------演示用------------------------ */
const yanshiYong = new mongoose.Schema({
    machinekey: { type: String }, //设备号
    tair1: { type: String }, //温度1
    airhumidity1: { type: String }, //湿度1
    Soiltemp1: { type: String }, //土壤温度1
    soilmoisture1: { type: String }, //土壤湿度1
    soi1: { type: String }, //光照强度1
    co21: { type: String },
    tair2: { type: String }, //温度1
    airhumidity2: { type: String }, //湿度1
    Soiltemp2: { type: String }, //土壤温度1
    soilmoisture2: { type: String }, //土壤湿度1
    soi2: { type: String }, //光照强度1
    co22: { type: String },
    tair3: { type: String }, //温度1
    airhumidity3: { type: String }, //湿度1
    Soiltemp3: { type: String }, //土壤温度1
    soilmoisture3: { type: String }, //土壤湿度1
    soi3: { type: String }, //光照强度1
    co23: { type: String },
    time: { type: String }, //时间
})

const qixiangzhan = new mongoose.Schema({
    tair1: { type: String }, //温度1
    airhumidity1: { type: String }, //湿度1
    soi1: { type: String }, //光照强度1
    fengxiang: { type: String },
    fengsu: { type: String },
    time: { type: String }, //时间
})


/* -------------------演示用----------------------- */

const sensorOne = new mongoose.Schema({
    machinekey: { type: String }, //设备号
    tair: { type: String }, //温度
    airhumidity: { type: String }, //湿度
    Soiltemp: { type: String }, //土壤温度
    soilmoisture: { type: String }, //土壤湿度
    soi: { type: String }, //光照强度
    rainfall: { type: String }, //降雨量
    time: { type: String }, //时间
})

const sensor = new mongoose.Schema({
    /* username: { type: String },
    sensorname: { type: String },
    tair: { type: String }, //温度
    airhumidity: { type: String }, //湿度
    Soiltemp: { type: String }, //土壤温度
    soilmoisture: { type: String }, //土壤湿度
    soi: { type: String }, //光照强度
    rainfall: { type: String }, //降雨量
    projectnumb: { type: Number },
    time: { type: String } */
    updatetime: { type: String },
    machinekey: { type: String },
    ch1rjy1: { type: String },
    ch2rjy2: { type: String },
    ch3ph1: { type: String },
    ch4ph2: { type: String },
    ch5rjy1: { type: String },
    ch6rjy2: { type: String },
    ch7ph1: { type: String },
    ch8ph2: { type: String },
    ch9rjy1: { type: String },
    ch10rjy2: { type: String },
    ch11ph1: { type: String },
    ch12ph2: { type: String },
    ch13rjy1: { type: String },
    ch14rjy2: { type: String },
    ch15ph1: { type: String },
    ch16ph2: { type: String },
    ch17rjy1: { type: String },
    ch18rjy2: { type: String },
    ch19ph1: { type: String },
    ch20ph2: { type: String },
    ch21rjy1: { type: String },
    ch22rjy2: { type: String },
    ch23ph1: { type: String },
    ch24ph2: { type: String },
    ch25rjy1: { type: String },
    ch26rjy2: { type: String },
    ch27ph1: { type: String },
    ch28ph2: { type: String },
    ch29rjy1: { type: String },
    ch30rjy2: { type: String },
    ch31ph1: { type: String },
    ch32ph2: { type: String },
})

const videodata = new mongoose.Schema({
    adminname: { type: String }, //管理员名称
    videoname: { type: String }, //视屏名称
    username: { type: String }, //用户名称
    areaname: { type: String }, //片区名称
    videoaddr: { type: String }, //视频地址
    time: { type: String }
})

const chartdata = new mongoose.Schema({
        adminname: { type: String }, //管理员名称
        formname: { type: String, unique: true }, //平台名称
        josnArry: { type: Array } //树
    })
    //总览数据表
const zonglandata = new mongoose.Schema({
    name: { type: String }, //网关下子片区名称
    waringnumb: { type: Number }, //网关下子片区报警数量
    renwuname: { type: String }, //网关下子片区未来任务名称
    waringstr: { type: String }, //网关下子片区报警信息
    renwuing: { type: String }, //网关下子片区正在运行的任务
    shezhi: { type: String }, //网关下子片区默认初始监控参数
    videoname: { type: String }, //网关下子片区监控名称
    videobool: { type: Boolean }, //网关下子片区是否有用监控
    videoaddr: { type: String }, //网关下子片区监控地址
    sensorlist: { type: Array }, //网关下子片区信息列表 { id: "rjy2", name: "溶解氧" },
    machinekey: { type: String }, //网关序列号
})
const videourl = new mongoose.Schema({
    adminname: { type: String }, //管理员名称
    projectnumb: { type: Number }, //平台名称
    videourl: { type: Array } //列表
})

/* --------演示用-------- */

const qixiangz = mongoose.model('qixiangzhan', qixiangzhan)
const yanshiy = mongoose.model('yanshiYong', yanshiYong)
    /* --------演示用-------- */
    //视频地址表
const videolist = mongoose.model('videourl', videourl)
    //数据表
const sensoro = mongoose.model('sensorOne', sensorOne)
    //设备控制数据表
const deviced = mongoose.model('deviceData', deviceData)
    //chart数据
const chartData = mongoose.model('chartData', chartdata)
    //管理员设备表1
const ProjectL = mongoose.model('ProjectL', ProjectList)
    //管理员片区表1
const UserM = mongoose.model('UserM', userMachine)
    //管理员子账户表1
const UserC = mongoose.model('UserC', UserChildren)
    //管理员表
const User = mongoose.model('User', UserSchema)
    //设备表
const MachineKey = mongoose.model('MachineKey', KeySchema)
    //设备详情表
const porject = mongoose.model('porjectSchema', porjectSchema)
    //随机生成数据表
const sensorA = mongoose.model('sensor', sensor)
    //总览数据表
const zongland = mongoose.model('zonglandata', zonglandata)

module.exports = { User, MachineKey, porject, UserC, UserM, ProjectL, sensorA, chartData, deviced, zongland, sensoro, videolist, yanshiy, qixiangz }