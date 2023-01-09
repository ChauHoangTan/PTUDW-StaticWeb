const addDatCho = (req, res) => {
    const { idTuyenXe, idKhachHang, soGhe, ngayDat, ngayDi, gioDi, thanhTien, trangThai } = req.body;
    const sql = `INSERT INTO DatCho (idTuyenXe, idKhachHang, soGhe, ngayDat, ngayDi, gioDi, thanhTien, trangThai) VALUES ('${idTuyenXe}', '${idKhachHang}', '${soGhe}', '${ngayDat}', '${ngayDi}', '${gioDi}', '${thanhTien}', '${trangThai}')`;
    connection.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    }
    )
}

const deleteDatCho = (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM DatCho WHERE id = ${id
    }`;
    connection.query
    (sql, ( err, result) => {
        if(err) throw err;
        res.send(result);
    }
    )
}

const updateDatCho = (req, res) => {
    const { id } = req.params;
    const { idTuyenXe, idKhachHang, soGhe, ngayDat, ngayDi, gioDi, thanhTien, trangThai } = req.body;
    const sql = `UPDATE DatCho SET idTuyenXe = '${idTuyenXe}', idKhachHang = '${idKhachHang}', soGhe = '${soGhe}', ngayDat = '${ngayDat}', ngayDi = '${ngayDi}', gioDi = '${gioDi}', thanhTien = '${thanhTien}', trangThai = '${trangThai}' WHERE id = ${id
    }`;
    connection.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    }
    )
}



