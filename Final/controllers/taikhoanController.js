const controller = {};
const Title = 'Tài khoản cá nhân';
const models = require('../models')

controller.showDetails = async (req, res) => {


    res.locals.Thong_Tin_Tai_Khoan = await models.Khach_Hang.findOne({
        where:{
            id:1
        }
    })


    res.render('tai_khoan', { Title })
}


controller.addThongTin = async (req, res) => {
    
    let ThongTin = {
        Ho_Ten: req.body.fullname,
        SDT: req.body.sdt,
        email : req.body.emailaddress
    };

    let check = await models.Khach_Hang.update(
        {
            Ho_Ten: ThongTin.Ho_Ten,
            SDT: ThongTin.SDT,
            email: ThongTin.email
        },
        {
            where:{
                id: 1
            }
        }



    )

    res.redirect('/taikhoan');

}

module.exports = controller;