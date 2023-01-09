const controller = {};
const models = require('../../models');
const Title = 'Quản lý đặt chỗ';

controller.showQL_DatCho = async (req, res) => {
    let dat_chos = await models.CT_Dat_Cho.findAll(
        {
            include: [
                {
                    model: models.Dat_Cho,
                    required: true
                },
                {
                    model: models.Chuyen_Xe,
                    required: true
                },
            ]
        }
    );
    res.render('admin/QL_DatCho', { Title, dat_chos })
    // res.send(dat_chos);
}

controller.Remove = async (req, res) => {
    models.CT_Dat_Cho.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/QL_DatCho');
    }
    );
}

controller.Update = async (req, res) => {
    models.CT_Dat_Cho.update({
        id: req.body.id,
        Gia: req.body.gia,
    }, {
        where: {
            id: req.body.id
        }
    }).then(() => {
        res.redirect('/QL_DatCho');
    }
    );
}

module.exports = controller;