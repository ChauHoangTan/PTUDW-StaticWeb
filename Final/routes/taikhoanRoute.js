const express = require('express')
const route = express.Router();
const controller = require('../controllers/taikhoanController');

route.get('/', (req, res) => {
    controller.showDetails(req,res);
});

route.post('/Thong_Tin', (req,res) => {
    controller.addThongTin(req,res);
})

module.exports = route;