const express = require('express')
const route = express.Router();
const controller = require('../../controllers/admin/QL_DatChoController');

route.get('/', (req, res) => {
    controller.showQL_DatCho(req,res);
});

route.get('/Remove/:id', (req, res) => {
    controller.Remove(req,res);
});

route.post('/UpdateC', (req, res) => {
    controller.Update(req,res);
});

module.exports = route;
