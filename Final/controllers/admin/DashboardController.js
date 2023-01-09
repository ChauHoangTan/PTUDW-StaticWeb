const controller = {};
const Title = 'Dashboard';
const models = require('../../models');

controller.Count_Account = async (req, res) => {
    // đếm số id trong bảng khách hàng
    let count_khach_hang = await models.Khach_Hang.findAll(
        {
            col: 'id'
        });

    // đếm số id trong bảng xe
    let count_xe = await models.Xe.findAll(
        {
            col: 'id'
        });

    // đếm số id trong bảng tuyến xe
    let count_tuyen_xe = await models.Chuyen_Xe.findAll(
        {
            col: 'id'
        });

    // đếm số id trong bảng nhà xe
    let count_nha_xe = await models.Nha_Xe.findAll(
        {
            col: 'id'
        });
    
    // đếm số vé xe đã đặt 
    let count_ve_xe = await models.Dat_Cho.findAll(
        {
            col: 'id'
        });

    
    res.render('admin/Dashboard', { count_khach_hang, count_xe , count_tuyen_xe , count_nha_xe , count_ve_xe });


}

module.exports = controller;
