const express = require('express')
const route = express.Router();
const controller = require('../controllers/datveController');
const models = require('../models')


route.get('/:id', (req, res) => {
    controller.showDetails(req,res);
});

route.post('/Thanh_Toan', controller.addDatCho)

module.exports = route;