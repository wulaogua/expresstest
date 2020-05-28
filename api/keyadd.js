const express = require('express');
const router = express.Router(); //新建路由
const { MachineKey } = require('../modb');
const { randadd: devicedata } = require('./devicedata.js')

async function mkey(res) {
    await MachineKey.create({
        machinekey: res,
        keystate: false
    })
}


router.post('/api/machinekey', async(req, res) => {
    let tt;
    for (var i = 1; i < 200; i++) {
        switch (true) {
            case i <= 9:
                tt = `FX00${i}`;
                devicedata(tt);
                mkey(tt);
                break;

            case i <= 99:
                tt = `FX0${i}`;
                devicedata(tt);
                mkey(tt);
                break;

            case i <= 200:
                tt = `FX${i}`;
                devicedata(tt);
                mkey(tt);
                break;
        }

    }
});

module.exports = router;