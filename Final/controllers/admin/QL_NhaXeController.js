const controller = {};
const title = 'Quản lý nhà xe';
const models = require('../../models');

controller.showDashboard = (req, res) => {
    res.render('admin/QL_NhaXe', { title });
}

controller.showList = async (req, res) => {
    let nha_xes = await models.Nha_Xe.findAll();
    res.render('admin/QL_NhaXe', { title, nha_xes });
}

controller.Remove = (req, res) => {
    models.Nha_Xe.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/QL_NhaXe');
    });
}

controller.Add = (req, res) => {
    models.Nha_Xe.create({
        ten_Nha_Xe: req.body.ten_Nha_Xe,
        So_Luong_Xe: req.body.So_Luong_Xe,
        SDT: req.body.SDT,
        Dia_Chi: req.body.Dia_Chi,
    }).then(() => {
        res.redirect('/QL_NhaXe');
    });
}

controller.Update = (req, res) => {
    models.Nha_Xe.update({
        ten_Nha_Xe: req.body.ten_Nha_Xe,
        So_Luong_Xe: req.body.So_Luong_Xe,
        SDT: req.body.SDT,
        Dia_Chi: req.body.Dia_Chi,

    }, {
        where: {
            id: req.body.nha_xe_id
        }
    }).then(() => {
        res.redirect('/QL_NhaXe');
    });
}

module.exports = controller;

