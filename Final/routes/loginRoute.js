const express = require('express')
const route = express.Router();
const controller = require('../controllers/loginController');
const models = require('../models');


route.get('/',(req,res)=>{
    controller.showlogin(req,res);
})

route.post('/',(req,res) => {
    controller.checkAccount(req,res);
});

module.exports = route;