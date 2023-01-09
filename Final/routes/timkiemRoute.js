const express = require('express')
const route = express.Router();
const controller = require('../controllers/timkiemController');

route.get('/', (req, res) => {
    controller.showResultList(req,res);
})

module.exports = route;