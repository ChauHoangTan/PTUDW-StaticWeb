const controller = {};
const Title = 'Lịch Sử Đặt Vé';
const models = require('../models')

controller.showHistory = async (req, res) => {

    res.locals.lich_su_dat_ve = await models.Dat_Cho.findAll({
        where:{
            KhachHangId: 1
            
        },
        include: [{
            model:models.CT_Dat_Cho,
            required: true,
            include: [{
                model:models.Chuyen_Xe,
                required: true,
                include:[{
                    model: models.Nha_Xe,
                    required: true,
                    attributes: ['ten_Nha_Xe']
                }]
            }]
        }]

        
    })

   

    //res.send(lich_su_dat_ve[0].CT_Dat_Chos)
    
    res.render('lich_su_dat_ve', { Title })
}

controller.removeSeat = async (req, res) =>{

    let idGhe = req.body.idGhe;
    console.log(idGhe);

    await models.CT_Dat_Cho.destroy({
        where:{
            id: idGhe
        }
    })

    res.redirect('/taikhoan/lichsudatve')

}


module.exports = controller;