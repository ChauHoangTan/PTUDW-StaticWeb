const helper = {};

helper.generateStarList = (stars) => {
    let str = '<div class="rating">';
    let star = Math.floor(stars);
    let half = stars - star;

    for (i = 1; i <= star; i++) {
        str += '<i class="fa-solid fa-star"></i>';
    }

    if (half > 0) {
        str += '<i class="fa-regular fa-star-half-stroke"></i>';
    }

    for (i = 1; i <= 5 - stars; i++) {
        str += '<i class="fa-regular fa-star"></i>';
    }

    str += '</div>';
    
    return str;
}

helper.generateSeat = (Tinh_Trang) => {
    let str = '';

    if(Tinh_Trang == true){
        str+= 'id="c1" class="check" onclick="this.checked=!this.checked;" checked="checked" '
    }
    //console.log(Tinh_Trang)
    return str
}

helper.parseToDate = (dateDefault) => {
    let date = new Date(dateDefault)
    let day = date.getDate()
    let month =  date.getMonth() + 1
    let year = date.getFullYear()

    return String(day) +"/" + String(month) +"/" + String(year)  
}

helper.calculateTimeEnd = (timeStart, totalTime) => {
    let timeEnd = parseInt(timeStart.slice(0,2)) + parseInt(totalTime)
    if(timeEnd > 23){
        timeEnd = timeEnd - 24
    }

    return String(timeEnd) + ":00:00" 
}



module.exports = helper;