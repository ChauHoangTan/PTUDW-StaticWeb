const express = require('express')
const route = express.Router();
const controller = require('../controllers/lichsudatveController');

route.get('/', (req, res) => {
    controller.showHistory(req,res);
});

route.post('/', (req,res) => {
    controller.removeSeat(req, res);
})

module.exports = route;