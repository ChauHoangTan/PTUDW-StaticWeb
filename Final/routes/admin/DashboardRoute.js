const express = require('express')
const route = express.Router();
const controller = require('../../controllers/admin/DashboardController');

route.get('/', (req, res) => {
    controller.Count_Account(req, res);
});

route.get('/', (req, res) => {
    controller.Count_Xe(req, res);
});

module.exports = route;
