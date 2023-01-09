const controller = {};
const models = require('../models');
const { get } = require('../routes/chuyenxeRoute');

controller.showList = (req, res) => {
    let Title = 'Danh sách chuyến xe';
    res.render('chuyen_xe', { Title });
}

controller.showDetails= async (req, res) => {
    let Title = 'Chi tiết chuyến xe';

    // lấy id từ params
    let id = req.params.id

    // lấy dữ liệu bảng chuyến xe từ id
    let detailsChuyenXe = await models.Chuyen_Xe.findOne({
        where:{
            id: id
        }
    });
    res.locals.detailsChuyenXe= await models.Chuyen_Xe.findOne({
        where:{
            id: id
        }
    });
    //res.render('chuyen_xe', { Title });
    
    // lấy dữ liệu bảng nhà xe từ NhaXeId của bảng chuyến xe
    let getNhaXe = await models.Nha_Xe.findOne({
        where:{
            id : detailsChuyenXe.NhaXeId
        }
    })
    res.locals.getNhaXe = getNhaXe

    // lấy cái hình ảnh nhà xe từ khóa ngoại NhaXeId của bảng nhà xe
    let getImage = await models.Nha_Xe_IMG.findAll({
        atrributes:['imgPath'],
        where:{
            NhaXeId: getNhaXe.id
        }
    })
    res.locals.getImage= await models.Nha_Xe_IMG.findAll({
        atrributes:['imgPath'],
        where:{
            NhaXeId: getNhaXe.id
        }
    })

    // lấy dữ liệu về xe của chuyến xe
    let getXe = await models.Xe.findOne({
        where:{
            id : detailsChuyenXe.XeId
        }
    })
    res.locals.getXe

    // lấy dữ liệu loại xe của chuyến xe
    let getLoaiXe = await models.Loai_Xe.findOne({
        where:{
            id: getXe.LoaiXeId
        }
    })
    res.locals.getLoaiXe

    // chuyển đổi từ dạng hh:mm:ss sang hh cho dễ xài
    function convertTimeToString(time, Tong_Thoi_Gian_Hanh_Trinh){
        let hourStart = time.slice(0,2)

        let intHourStart = parseInt(hourStart)
        
        let hourEnd = intHourStart + parseInt(Tong_Thoi_Gian_Hanh_Trinh)

        if(hourEnd<10){
            hourEnd = "0" + String(hourEnd)
        }else if(hourEnd > 23){
            hourEnd = String(hourEnd - 24)
        }
        else{
            hourEnd = String(hourEnd)
        }

        return {hourStart: hourStart,hourEnd: hourEnd}
    }

    let hour
    hour = convertTimeToString(detailsChuyenXe.Gio_Bat_Dau, detailsChuyenXe.Tong_Thoi_Gian_Hanh_Trinh)

    let imgChuyenXe1 = getImage[0].imgPath
    let imgChuyenXe2 = getImage[1].imgPath
    let imgChuyenXe3 = getImage[2].imgPath
    let imgChuyenXe4 = getImage[3].imgPath
    let imgChuyenXe5 = getImage[4].imgPath

    res.locals.imgChuyenXe1 = imgChuyenXe1
    res.locals.imgChuyenXe2 = imgChuyenXe2
    res.locals.imgChuyenXe3 = imgChuyenXe3
    res.locals.imgChuyenXe4 = imgChuyenXe4
    res.locals.imgChuyenXe5 = imgChuyenXe5

    

    //console.log(getImage)
    let findDiemDi = await models.Dia_Diem.findOne({
        where:{
            id: detailsChuyenXe.DiemDiId
        }
    })
    
    let findDiemDen = await models.Dia_Diem.findOne({
        where:{
            id: detailsChuyenXe.DiemDenId
        }
    })


    // convert ngày từ ngày của chuyến xe
    function convertToDateStart(){
        let date = new Date(detailsChuyenXe.Ngay_Di)
        let day = date.getDate()
        let month =  date.getMonth() + 1
        let year = date.getFullYear()

        return String(day) +"/" + String(month) +"/" + String(year)
    }

    console.log(detailsChuyenXe.Ngay_Di)

    function convertToDateEnd(){
        let date = new Date(detailsChuyenXe.Ngay_Di)
        let day = date.getDate()
        let month =  date.getMonth() + 1
        let year = date.getFullYear()

        let timeStart = detailsChuyenXe.Gio_Bat_Dau
        let totalTime = detailsChuyenXe.Tong_Thoi_Gian_Hanh_Trinh
        if(parseInt(timeStart) + parseInt(totalTime) > 23){
            
            if((month<=7 && month % 2 == 1) || (month >=8 && month % 2 == 0)){
                if(day + 1 > 31){
                  day = day + 1 - 31;
                  month += 1;
                  if(month > 12){
                    month = 1;
                    year++;
                  }
                }
                else{
                  day += 1;
                }
              }
              else if(month == 2){
                if(year % 400 == 0 ){
                  if(day + 1 > 29){
                    day =  day + 1 - 29 ;
                    month ++;
          
                  }
                  else{
                    day = day + 1;
                  }
                }
                else if(year % 4 == 0 && year % 100 != 0){
                  if(day + 1 > 29){
                    day =  day + 1 - 29 ;
                    month ++;
          
                  }
                  else{
                    day = day + 1;
                  }
                }
                else{
                  if(day + 1 > 28){
                    day =  day + 1 - 28 ;
                    month ++;
          
                  }
                  else{
                    day = day + 1;
                  }
                }
              }
              else{
                if(day + 1 > 30){
                  day = day + 1 - 30;
                  month += 1;
                }
                else{
                  day += 1;
                }
              }

        }

        

        return String(day) +"/" + String(month) +"/" + String(year)
    }

    let Ngay_Di = convertToDateStart()
    let Ngay_Den = convertToDateEnd()

    res.locals.general1 = {
        Nha_Xe: getNhaXe.ten_Nha_Xe, 
        Diem_Di:findDiemDi.name, 
        Diem_Den:findDiemDen.name, 
        Thoi_Gian_Bat_Dau:hour.hourStart, 
        Thoi_Gian_Den_Noi:hour.hourEnd, 
        Ngay_Di:Ngay_Di,
        Ngay_Den:Ngay_Den, 
        Tong_Thoi_Gian_Hanh_Trinh:detailsChuyenXe.Tong_Thoi_Gian_Hanh_Trinh
    }
    
    
    let Gia_Ve = detailsChuyenXe.Gia_Ve.slice(0,3)
    let getDatCho = await models.CT_Dat_Cho.findAll({
        where:{
            ChuyenXeId: detailsChuyenXe.id
        }
    })
    let So_Luong_Ghe_Trong = getXe.So_Luong_Ghe - Object.keys(getDatCho).length

    res.locals.general2 = {
        Gia_Ve:Gia_Ve,
        Lien_He:'1900996678',
        So_Luong_Ghe:getXe.So_Luong_Ghe,
        Loai_Xe:getLoaiXe.Ten_Loai,
        So_Luong_Ghe_Trong:So_Luong_Ghe_Trong
    }


    
    res.render('chuyen_xe',{Title})
   
    
}



module.exports = controller;