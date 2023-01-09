const express = require('express')
const route = express.Router();
const controller = require('../controllers/chuyenxeController');

route.get('/', (req, res) => {
    controller.showList(req,res);
});

route.get('/:id', (req, res) => {
    controller.showDetails(req,res);
});

module.exports = route;