const controller = {}
const models = require('../../../Final/models/nha_xe');

controller.show = async (req, res) => {
    res.locals.NhaXe = await models.Nha_Xe.findAll();
    res.render('QL_NhaXe');
}



