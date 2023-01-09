const controller = {};
const models = require('../../models');
const title = 'Quản lý tuyến xe';

controller.showQL_TuyenXe = async (req, res) => {
    let chuyen_xes = await models.Chuyen_Xe.findAll({
        include: [
            { association: 'Diem_Di' },
            { association: 'Diem_Den' },
        ]
    });
    console.log(chuyen_xes);
    res.render('admin/QL_TuyenXe', {title, chuyen_xes});
}

controller.Remove = async (req, res) => {
    models.Chuyen_Xe.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/QL_TuyenXe');
    }
    );
}


module.exports = controller;