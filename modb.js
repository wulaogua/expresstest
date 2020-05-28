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
    inPin: { type: Array },
    outPin: { type: Array },
    projectnumb: { type: Number },
})

const sensor = new mongoose.Schema({
    username: { type: String },
    sensorname: { type: String },
    tair: { type: String }, //温度
    airhumidity: { type: String }, //湿度
    Soiltemp: { type: String }, //土壤温度
    soilmoisture: { type: String }, //土壤湿度
    soi: { type: String }, //光照强度
    rainfall: { type: String }, //降雨量
    projectnumb: { type: Number },
    time: { type: String }
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
module.exports = { User, MachineKey, porject, UserC, UserM, ProjectL, sensorA, chartData, deviced }