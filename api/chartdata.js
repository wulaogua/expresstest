const express = require('express')
const router = express.Router(); //新建路由
const { chartData } = require('../modb')
const jwt = require('jsonwebtoken')
const seckey = 'dsd' //tonken的密钥
const uuid = require('node-uuid');
const { ProjectL } = require('../modb')
const { porject } = require('../modb')
const { UserM } = require('../modb')

function deletarry(data) {
    data.children.forEach(item => {
        delete item.relationship;
        delete item.Id;
        delete item.id;
        if (!item.children) {
            return;
        } else {
            deletarry(item);
        }
    })
    return data;
}

async function addproject(value, adname, treename) {
    let numb = await ProjectL.find({ username: adname }).sort({ projectnumb: -1 }).skip(0).limit(1);
    if (numb.length === 0) {
        await ProjectL.create({
            platename: treename,
            username: adname,
            areaname: value,
            projectnumb: 1,
            usernumb: 0,
            areanumb: 1,
            errornumb: 0,
            waringnumb: 0
        })
        await porject.create({
            platename: treename,
            username: adname,
            projectname: value,
            projectnumb: 1,
        })
    } else {
        await ProjectL.create({
            platename: treename,
            username: adname,
            areaname: value,
            projectnumb: numb[0].projectnumb + 1,
            usernumb: 0,
            areanumb: 1,
            errornumb: 0,
            waringnumb: 0
        })
        await porject.create({
            platename: treename,
            username: adname,
            projectname: value,
            projectnumb: numb[0].projectnumb + 1,
        })
    }
}

async function addpianqu(adname, pqname, platename) {
    let numb = await ProjectL.find({ username: adname }).sort({ projectnumb: -1 }).skip(0).limit(1);
    await UserM.create({
        projectnumb: numb[0].projectnumb,
        nickname: pqname,
        AdminName: adname,
        platename: platename,
    })
}

const chartAuth = async(req, res, next) => {
    const raw = req.headers.authorization.split(' ').pop()
    const { username } = jwt.verify(raw, seckey)
    req.numb = await chartData.find({ adminname: username })
    req.chartname = username
    next()
}
const nameAuth = async(req, res, next) => {
    const raw = req.headers.authorization.split(' ').pop()
    const { username: ress } = jwt.verify(raw, seckey)
    req.chartname = ress
    req.value = true;
    next()
}

router.post('/api/chartdata/seek', chartAuth, async(req, res) => {

    if (req.numb.length === 0) {
        return res.send({
            "meta": {
                'msg': "无设备",
                'status': 422
            }
        })
    } else {
        return res.send({
            "meta": {
                'msg': '成功',
                'data': req.numb,
                'status': 200
            }
        })
    }

})

router.post('/api/chartdata/add', nameAuth, async(req, res) => {

    let hangye = req.body.b
    let tree = req.body.UpLevelForm
    let jidi = req.body.listform

    const tests = (async() => {

        for (var i = 0; i < tree.children.length; i++) {
            let hangye = tree.children[i]
            for (var o = 0; o < hangye.children.length; o++) {
                let xiangmu = hangye.children[o]
                await addproject(xiangmu.name, req.chartname, tree.name)
                for (var p = 0; p < xiangmu.children.length; p++) {
                    let pianqu = xiangmu.children[p]
                    await addpianqu(req.chartname, pianqu.name, tree.name)
                }
            }
        }
    })


    jidi.forEach((itema, i) => {
        itema.list.forEach(itemb => {
            itemb.value = uuid.v1()
        })
    })

    hangye.forEach((item, i) => {
        item.children = jidi[i].list
    })


    tests();
    //数的子项循环 行业循环
    tree.children.forEach((item) => {
        //对应行业验证
        hangye.forEach(item_1 => {
            if (item.name === item_1.Fname) {
                item.children.forEach((item_2) => {
                    if (item_2.name === item_1.Sname) {

                        item_2.children = item_1.children
                    }
                })
            }
        })
    })

    delete tree.relationship;

    tree = deletarry(tree);


    if (req.value) {
        const chdata = await chartData.create({
            adminname: req.chartname, //管理名
            formname: req.body.UpLevelForm.name, //平台名
            josnArry: tree //树
        })

        if (!chdata) {
            return res.send({
                "meta": {
                    'msg': "添加失败",
                    'status': 422
                }
            })
        } else {
            return res.send({
                "meta": {
                    'msg': "添加成功",
                    'status': 200
                }
            })
        }
    }
    /* else {
           const chdata1 = await chartData.updateOne({ adminname: req.chartname, formname }, {
               josnArry: tree
           })
           if (!chdata1) {
               return res.send({
                   "meta": {
                       'msg': "更新失败",
                       'status': 422
                   }
               })
           } else {
               return res.send({
                   "meta": {
                       'msg': "更新成功",
                       'status': 200
                   }
               })
           }
       } */
})

router.post('/api/chartdata/query', async(req, res) => {
    var objectId = require('mongodb').ObjectId;
    const dataA = await chartData.findOne({ '_id': objectId(req.body.id) })
    if (dataA) {
        return res.send({
            "meta": {
                'msg': '成功',
                'data': dataA.josnArry,
                'status': 200
            }
        })
    } else {
        return res.send({
            "meta": {
                'msg': '失败',
                'status': 422
            }
        })
    }
})


module.exports = router;