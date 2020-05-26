const express = require('express')
const router = express.Router(); //新建路由
const { chartData } = require('../modb')
const jwt = require('jsonwebtoken')
const seckey = 'dsd' //tonken的密钥

const plateInAuth = async(req, res, next) => {
    const raw = req.headers.authorization.split(' ').pop()
    const { username } = jwt.verify(raw, seckey)
    req.numb = await chartData.find({ adminname: username })
    req.chartname = username
    next()
}