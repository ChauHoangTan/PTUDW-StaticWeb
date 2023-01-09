const addTuyenXe = (req, res) => {
    const { tenTuyen, diemDi, diemDen, giaVe, thoiGianDi, thoiGianDen, soGhe, soGheTrong, soGheDat, ngayDi, ngayDen, gioDi, gioDen, hinhAnh, idTaiXe, idXe } = req.body;
    const sql = `INSERT INTO TuyenXe (tenTuyen, diemDi, diemDen, giaVe, thoiGianDi, thoiGianDen, soGhe, soGheTrong, soGheDat, ngayDi, ngayDen, gioDi, gioDen, hinhAnh, idTaiXe, idXe) VALUES ('${tenTuyen}', '${diemDi}', '${diemDen}', '${giaVe}', '${thoiGianDi}', '${thoiGianDen}', '${soGhe}', '${soGheTrong}', '${soGheDat}', '${ngayDi}', '${ngayDen}', '${gioDi}', '${gioDen}', '${hinhAnh}', '${idTaiXe}', '${idXe}')`;
    connection.query(sql , (err, result) => {
        if(err) throw err;
        res.send(result);
    }
    )
}

const deleteTuyenXe = (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM TuyenXe WHERE id = ${id}`;
    connection.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    })
}

const updateTuyenXe = (req, res) => {
    const { id } = req.params;
    const { tenTuyen, diemDi, diemDen, giaVe, thoiGianDi, thoiGianDen, soGhe, soGheTrong, soGheDat, ngayDi, ngayDen, gioDi, gioDen, hinhAnh, idTaiXe, idXe } = req.body;
    const sql = `UPDATE TuyenXe SET tenTuyen = '${tenTuyen}', diemDi = '${diemDi}', diemDen = '${diemDen}', giaVe = '${giaVe}', thoiGianDi = '${thoiGianDi}', thoiGianDen = '${thoiGianDen}', soGhe = '${soGhe}', soGheTrong = '${soGheTrong}', soGheDat = '${soGheDat}', ngayDi = '${ngayDi}', ngayDen = '${ngayDen}', gioDi = '${gioDi}', gioDen = '${gioDen}', hinhAnh = '${hinhAnh}', idTaiXe = '${idTaiXe}', idXe = '${idXe}' WHERE id = ${id}`;
    connection.query(sql , (err, result) => {
        if(err) throw err;
        res.send(result);
    }
    )
}

// Path: Original\admin\js\QL_TuyenXe.js