const { Op } = require('sequelize');
const controller = {};
const Title = 'Tìm kiếm chuyến xe';
const models = require('../models');

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

controller.showResultList = async (req, res) => {
    let page = req.query.page || 1;
    let diem_di = req.query.diemdi;
    let diem_den = req.query.diemden;
    let ngay_di = new Date(req.query.ngaydi);
    let nha_xe = req.query.nhaxe || '';
    let filter_time = req.query.filterTime;
    let filter_price = req.query.filterPrice;
    let sort_time = req.query.sortTime;
    let sort_price = req.query.sortPrice;

    let options = {
        where: {},
        order: [],
        include: [
            { 
                model: models.Xe,
                required: true,
                include: [{ 
                    model: models.Nha_Xe,
                    required: true,
                    where: {
                        ten_Nha_Xe: {
                            [Op.iLike]: `%${nha_xe}%`
                        }
                    }
                }]
            },
            { model: models.Xe, include: [ models.Loai_Xe ] }
        ]
    };

    let orders = {
        earliest: ['Gio_Bat_Dau', 'ASC'],
        latest: ['Gio_Bat_Dau', 'DESC'],
        priceASC: ['Gia_Ve', 'ASC'],
        priceDESC: ['Gia_Ve', 'DESC']
    };

    let time_range = {
        dawn: ['00:00:00', '06:00:00'],
        morning: ['06:01:00', '12:00:00'],
        evening: ['12:01:00', '18:00:00'],
        night: ['18:01:00', '23:59:00']
    };

    let price_range = {
        pricerange1: [0, 250000],
        pricerange2: [250000, 500000],
        pricerange3: [500000, 1000000],
        pricerange4: [1000000, 999999999]
    };

    if (filter_time) {
        options.where.Gio_Bat_Dau = {
            [Op.between]: time_range[filter_time]
        };
    }
    if (filter_price) {
        options.where.Gia_Ve = {
            [Op.between]: price_range[filter_price]
        };
    }
    if (sort_time) {
        options.order.push(orders[sort_time]);
    }
    if (sort_price) {
        options.order.push(orders[sort_price]);
    }
    if (diem_di != '') {
        let diem_di_id = await models.Dia_Diem.findOne({
            where : {
                name: diem_di
            }
        });
        options.where.DiemDiId = diem_di_id.id
    }
    if (diem_den != '') {
        let diem_den_id = await models.Dia_Diem.findOne({
            where : {
                name: diem_den
            }
        });
        options.where.DiemDenId = diem_den_id.id
    }
    options.where.Ngay_Di = ngay_di;

    // let limit = 10;
    // if (page > 0) {
    //     options.limit = limit;
    //     options.offset = limit * (page - 1);
    // }

    // let { rows, count } = await models.Chuyen_Xe.findAndCountAll(options);
    
    // let pagination = { 
    //     page,
    //     limit,
    //     totalRows: count
    // };

    // let chuyen_xes = rows;

    let chuyen_xes = await models.Chuyen_Xe.findAll(options);
    let dia_diems = await models.Dia_Diem.findAll();
    let nha_xes = await models.Nha_Xe.findAll();
    
    res.render('tim_kiem', {
        Title,
        diem_di,
        diem_den,
        ngay_di: formatDate(ngay_di),
        chuyen_xes,
        dia_diems,
        nha_xes
    });
}

module.exports = controller;