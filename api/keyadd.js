const express = require('express');
const router = express.Router(); //新建路由
const { MachineKey } = require('../modb')

async function mkey() {
    await MachineKey.create({
        machinekey: req.body.machinekey,
        keystate: req.body.keystate
    })
}

router.post('/api/machinekey', async(req, res) => {
    let tt;
    for (var i = 0; i < 200; i++) {
        switch (true) {
            case i <= 9:
                tt = `FX00${i}`;
                mkey();
                break;

            case i <= 99:
                tt = `FX0${i}`;
                mkey();
                break;

            case i <= 200:
                tt = `FX${i}`;
                mkey();
                break;
        }

    }


});

module.exports = router;