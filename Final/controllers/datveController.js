

const models = require('../models');
const controller = {};
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Title = 'Đặt vé';


controller.showDetails = async (req, res) => {

    // lấy id từ params
    

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
    res.locals.getNhaXe

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

    res.locals.imgChuyenXe1 = imgChuyenXe1

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
    
    let Gia_Ve_Duoi = parseInt(detailsChuyenXe.Gia_Ve) + parseInt(detailsChuyenXe.Gia_Ve)*0.1
    Gia_Ve_Duoi = String(Gia_Ve_Duoi).slice(0,3);
    
    let Gia_Ve = detailsChuyenXe.Gia_Ve.slice(0,3)
    let getDatCho = await models.CT_Dat_Cho.findAll({
        where:{
            ChuyenXeId: detailsChuyenXe.id
        }
    })
    let So_Luong_Ghe_Trong = getXe.So_Luong_Ghe - Object.keys(getDatCho).length

    res.locals.general2 = {
        Gia_Ve:Gia_Ve,
        Gia_Ve_Duoi:Gia_Ve_Duoi,
        Lien_He:'1900996678',
        So_Luong_Ghe:getXe.So_Luong_Ghe,
        Loai_Xe:getLoaiXe.Ten_Loai,
        So_Luong_Ghe_Trong:So_Luong_Ghe_Trong
    }


    

    // 
    // phần này để kiểm tra loại ghế
    //

    // lấy danh sách ghế dưới
    let getGheDuoi = await models.Ghe.findAll({
      where:{
        XeId : getXe.id,
        LoaiGheId: 2
      }
    })

    // lấy danh sách ghế trên
    let getGheTren = await models.Ghe.findAll({
      where:{
        XeId : getXe.id,
        LoaiGheId: 1
      }
    })


    let getCT_Dat_Cho = await models.CT_Dat_Cho.findAll({
      where:{
        ChuyenXeId : detailsChuyenXe.id
      }
    })

    function DanhSachTinhTrangGheDuoi(){
      let list = []

      // Duyệt để kiểm tra tình trang ghế
      for(i = 0; i < Object.keys(getGheDuoi).length; i = i + 2 ){

        let check1 = getCT_Dat_Cho.filter(function(e){
          return e.GheId == getGheDuoi[i].id
        })

        let check2 = getCT_Dat_Cho.filter(function(e){
          return e.GheId == getGheDuoi[i+1].id
        })

        let Tinh_Trang1 = false
        let Tinh_Trang2 = false

        if(Object.keys(check1).length > 0 ){
          Tinh_Trang1 = true
        }

        if(Object.keys(check2).length > 0 ){
          Tinh_Trang2 = true
        }


        list.push({Ghe:{GheId1 : getGheDuoi[i].id,GheId2: getGheDuoi[i+1].id, Tinh_Trang1: Tinh_Trang1, Tinh_Trang2: Tinh_Trang2}}
          
        )

        
      }

      return list

    }



    res.locals.Tinh_Trang_Ghe_Duoi = DanhSachTinhTrangGheDuoi()
    let Ghe_Duoi = DanhSachTinhTrangGheDuoi()

    //console.log(Object.keys(getGheDuoi).length)

    function DanhSachTinhTrangGheTren(){
      let list = []

      // Duyệt để kiểm tra tình trang ghế
      for(i = 0; i < Object.keys(getGheTren).length; i = i + 2 ){

        
        let check1 = getCT_Dat_Cho.filter(function(e){
          return e.GheId == getGheTren[i].id
        })

        let check2 = getCT_Dat_Cho.filter(function(e){
          return e.GheId == getGheTren[i+1].id
        })

        let Tinh_Trang1 = false
        let Tinh_Trang2 = false

        if(Object.keys(check1).length > 0 ){
          Tinh_Trang1 = true
        }

        if(Object.keys(check2).length > 0 ){
          Tinh_Trang2 = true
        }


        list.push({Ghe:{GheId1 : getGheTren[i].id,GheId2: getGheTren[i+1].id, Tinh_Trang1: Tinh_Trang1, Tinh_Trang2: Tinh_Trang2}}
          
        )

        
      }

      return list

    }

    

    res.locals.Tinh_Trang_Ghe_Tren = DanhSachTinhTrangGheTren()

    
    //let sinhVienCungs = sinhViens.filter(function(e) {
    //   return e.tuoi == 18;
    // 
    //console.log(Ghe_Duoi);

    //console.log(Ghe_Duoi)1


    // function toMoney(string) {
    //   let result = string
    //   let length = result.length

    //   for( i = length - 1; i >= 0; i = i - 3){
         
    //         let left = result.slice(0,i+1)
    //         let right = result.slice(i+1)

    //         result = left + "." + right

       
    //   }

    //   return result
    // }

    // result = toMoney("2340")
    // console.log(result)

    //lấy thông tin về tài khoản đề điền vào modal  
    res.locals.Thong_Tin_Tai_Khoan = await models.Khach_Hang.findOne({
      where:{
        id : 1
      }
    })

    // lấy số lượng ghế đã được đặt  
    let idGheDauTren = getGheTren[0].id
    let idGheCuoiTren = idGheDauTren + Object.keys(getGheTren).length - 1;

    let idGheDauDuoi = getGheDuoi[0].id
    let idGheCuoiDuoi = idGheDauDuoi + Object.keys(getGheDuoi).length - 1;

    let listOrderedSeatsOnTop = await models.CT_Dat_Cho.findAll({
      where:{
        ChuyenXeId: detailsChuyenXe.id,
        GheId : {[Op.between] : [idGheDauTren,idGheCuoiTren]}
        
      }
    })

    let listOrderedSeatsUnder = await models.CT_Dat_Cho.findAll({
      where:{
        ChuyenXeId: detailsChuyenXe.id,
        GheId : {[Op.between] : [idGheDauDuoi,idGheCuoiDuoi]}
        
      }
    })

    let listOrdered = await models.CT_Dat_Cho.findAll({
      where:{
        ChuyenXeId: detailsChuyenXe.id,
        GheId : {[Op.between] : [idGheDauTren,idGheCuoiDuoi]}
        
      }
    })
    
    let list = []
    
    for(i = 0; i < Object.keys(listOrdered).length; i++){
      
        list.push(listOrdered[i].GheId)

    }


    res.locals.isOrdered = list
    res.locals.amountOrdered = list.length
    res.locals.GheTrenOrdered = Object.keys(listOrderedSeatsOnTop).length;
    res.locals.GheDuoiOrdered = Object.keys(listOrderedSeatsUnder).length;
  

    res.render('dat_ve', { Title });
}





controller.addDatCho = async (req, res) => {

    let DatCho = {
        Tong_Tien: req.body.TongTien,
        KhachHangId: 1
    }

    DatCho = await models.Dat_Cho.create(DatCho)

    let temp = await models.Dat_Cho.findAll();
    
    // tìm cái idVe vừa mới push vào bảng đặt chỗ
    let idVe = Object.keys(temp).length

    // lấy danh sách các ghế checked từ post
    let ghes = req.body.ghe

    // lấy danh sách cách ghế đã được đặt bởi người khác
    let ghesOld = req.body.GheOld.split(",")

    // lấy danh sách ghế vừa mới chọn
    let ghesNew = []
    for(i = 0; i < ghes.length; i++){
      let count = 0
      for(j = 0; j < ghesOld.length; j++){
        if(ghes[i] == ghesOld[j]){
          count ++;
          break;
        }
      }

      if(count == 0){
        ghesNew.push(ghes[i])
      }
    }

    for(i = 0; i < ghesNew.length; i++){
      let CT_DatCho = {
        Gia: req.body.GiaVe,
        ChuyenXeId: req.body.ChuyenXeId,
        VeId: idVe,
        GheId: ghesNew[i]
  
      }

      CT_DatCho = await models.CT_Dat_Cho.create(CT_DatCho);
    }

    res.redirect(`/chuyenxe/${req.body.ChuyenXeId}/datve/${req.body.ChuyenXeId}`)

}


module.exports = controller;