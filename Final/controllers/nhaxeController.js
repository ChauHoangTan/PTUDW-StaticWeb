const controller = {};
const models = require('../models');

controller.showList = async (req, res) => {
    let Title = 'Danh sách nhà xe';
    let nha_xes = await models.Nha_Xe.findAll();
    res.render('nha_xe', { Title, nha_xes });
}

controller.showDetails = async (req, res) => {
    let Title = 'Chi tiết nhà xe';
    let id = req.params.id;
    let nha_xe = await models.Nha_Xe.findOne({
        where : {
            id: id
        },
        include: [
            { 
                model: models.Danh_Gia ,
                required: true,
                include: [{
                    model: models.Khach_Hang,
                    required: true
                }]
            },
            { model: models.Nha_Xe_IMG }
        ]
    });
    console.log(nha_xe);
    res.render('nha_xe', { Title, nha_xe });
}

controller.addReview = async (req, res) => {
    let id = req.body.nhaXeId;
    let danh_gia = {
        NhaXeId: req.body.nhaXeId,
        stars: req.body.star,
        // Ho_Ten: req.body.name,
        // email: req.body.email,
        Noi_Dung: req.body.comment
    };
    review = await models.Danh_Gia.create(danh_gia);

    let nha_xe = await models.Nha_Xe.findOne({
        where: { id: id },
        include: [{ model: models.Danh_Gia }]
    });
    let stars = 0;
    nha_xe.Danh_Gia.forEach(danh_gia => {
        stars += danh_gia.stars;
    })
    nha_xe.stars = stars / nha_xe.Danh_Gia.length;
    nha_xe.update({ stars: nha_xe.stars });

    res.redirect(`/nhaxe/${id}`);
}

module.exports = controller;