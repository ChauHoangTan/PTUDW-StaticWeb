const controller = {};
const Title = 'Trang chủ VeXeMac';
const models = require('../models');

controller.showHome = async (req, res) => {
    let dia_diems = await models.Dia_Diem.findAll();
    let nha_xes = await models.Nha_Xe.findAll({
        attributes: ['id', 'ten_Nha_Xe']
    });
    res.render('index', { 
        Title,
        dia_diems,
        nha_xes
    });
}

module.exports = controller;