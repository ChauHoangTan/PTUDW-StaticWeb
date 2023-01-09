const express = require('express')
const route = express.Router();
const controller = require('../controllers/nhaxeController');

route.get('/', (req, res) => {
    controller.showList(req,res);
});

route.get('/:id', (req, res) => {
    controller.showDetails(req,res);
});

route.post('/danhgia', (req,res) => {
    controller.addReview(req,res);
})

module.exports = route;