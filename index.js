require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')

const response = require('./src/res/response')
const fishRouter = require('./src/routes/fishRoute')
const employeRouter = require('./src/routes/employeRoute')
const sortingPoolRouter = require('./src/routes/sortingPoolRoute')


const PORT = process.env.PORT || 5000

const app = express()

app.use(bodyParser.json())

// ===========================TABEL IKAN==============================
app.use(fishRouter)

// ===========================TABEL PENYORTIR=========================
app.use(employeRouter)

// ===========================TABEL KOLAM SORTIR======================
app.use(sortingPoolRouter)

// Handle not found page anything in api

// app.use((req, res, next) => {
//     res.status(404).send('(404 NOT FOUND) L🤔L');
// });

app.use((req, res, next) => {
    response(404, '404 NOT FOUND !!! 😭', 'error', res);
});

// ==================================================================






// Delete ikan by ID
app.delete('/ikan/:id_ikan', (req, res) => {
    const { params } = req
    const sql = `CALL DeleteIkanByID('${params.id_ikan}')`

    db.query(sql, (err, result) => {
        if (!err && result[0][0].result === "Ikan Tidak Ada Di Database") {
            response(404, "Ikan NOT FOUND", "error", res)
        } else if (!err) {
            response(200, result, "SUCCESS", res)
        } else {
            response(500, "Internal Server Error", "error", res)
        }
    })
})


// ========================TABEL PENYORTIR=========================
// get all karyawan penypertir
// app.get('/penyortir', (req, res) => {
//     db.query("CALL getALLPenyortir()", (error, result) => {
//         console.log({ dataIkan: result })
//         response(200, result, "success", res)
//     })
// })

// get penyortir by id
app.get('/penyortir/:id_penyortir', (req, res) => {
    const { params } = req
    const sql = `CALL CheckKaryawanByID('${params.id_penyortir}')`

    db.query(sql, (err, result) => {
        //apakah ini tidak terjadi error dan apakah result itu mengandung pesan 'Karyawan tidak ditemukan' 
        //ini itu ngebaca penyesuannya dari database query datagrid yang kita buat dan jika pesan itu sesuai 
        //dan sama maka berikan respon eror 404
        if (!err && result[0][0].result === "Karyawan tidak ditemukan") {
            response(404, "Karyawan tidak ditemukan", "error", res)
        } else if (!err) {
            response(200, result, "SUCCESS", res)
        } else {
            response(500, "Internal Server Error", "error", res)
        }
    })
})


// Update Data Jabatan Karyawan Penyortir
app.put('/penyortir', (req, res) => {
    const { body } = req

    db.query(`CALL UpdateJabatanPenyortir(${body.id_penyortir}, '${body.jabatan}')`,
        (err, update) => {
            if (err) response(500, "invalid", "error", res)

            if (update.affectedRows) {
                const data = {
                    isSuccess: update.affectedRows,
                    isValidation: update.protocol41,
                }
                response(200, data, 'Jabatan Berhasil Diubah', res)
            } else {
                response(404, "Penyortir Tidak Ditemukan", "error", res)
            }
        })
})

// Tambah Karyawan Penyortir
app.post('/penyortir', (req, res) => {
    const { body } = req
    const sql = `CALL InsertNewEmployer(
        ${body.id_perusahaan},
        '${body.nama_penyortir}',
        '${body.jabatan}'
    )`
    db.query(sql, (err, created) => {
        if (err) throw err
        response(201, created, 'Karyawan Baru Berhasil Ditambahkan', res)
    })
})


// Delete Karyawan by id and nama penyortir
app.delete('/penyortir/:id_penyortir/:nama_penyortir', (req, res) => {
    const { params } = req
    const sql = `CALL delete_penyortir_by_id_and_name(${params.id_penyortir}, '${params.nama_penyortir}')`

    db.query(sql, (err, result) => {
        if (err) {
            response(404, 'Karyawan Not Found', 'error', res)
        } else {
            response(200, 'Karyawan Berhasil Dihapus', 'SUCCESS', res)
        }
    })
})


// =========================TABEL KOLAM SORTIR==========================
// get All kolam sortir
app.get('/kolam_sortir', (req, res) => {
    db.query("CALL getALLKolamSortir()", (error, result) => {
        console.log({ dataKolam: result })
        response(200, result, 'SUCCESS', res)
    })
})

// get data kolam by id 
app.get('/kolam_sortir/:id_tempat', (req, res) => {
    const { params } = req
    const sql = `CALL CheckKolamByID(${params.id_tempat})`

    db.query(sql, (err, result) => {
        if (!err && result[0][0].result === "Kolam sortir tidak ditemukan") {
            response(404, "Kolam Not Found", "error", res)
        } else if (!err) {
            response(200, result, "SUCCESS", res)
        } else {
            response(500, "Internal Server Error", "error", res)
        }
    })
})

// Update kapasitas Kolam
app.put('/kolam_sortir', (req, res) => {
    const { body } = req
    const sql = `CALL UpdateKapasitasKolam(${body.id_tempat}, ${body.kapasitas_kolam})`

    db.query(sql, (err, update) => {
        if (err) response(500, "invalid", "error", res)

        if (update.affectedRows) {
            const data = {
                isSuccess: update.affectedRows,
                isValidation: update.protocol41,
            }
            response(200, data, 'Kapasitas Kolam Berhasil Diperbarui', res)
        } else {
            response(404, "Kolam Sortir Tidak Ditemukan", "error", res)
        }
    })
})


// =========================TABEL DETAIL PENYORTIRAN==============================

// get All detail penyortiran
app.get('/detail_penyortiran', (req, res) => {
    const sql = `CALL getALLDetailPenyortiran()`

    db.query(sql, (err, result) => {
        console.log({ DataDetail: result })
        if (err) throw err

        response(200, result, 'SUCCESS', res)
    })
})

// get detail penyortiran by id
app.get('/detail_penyortiran/:id_detail_penyortiran', (req, res) => {
    const { params } = req
    const sql = `CALL getDetailPenyortiranById(${params.id_detail_penyortiran})`

    db.query(sql, (err, result) => {
        console.log({ databyID: result })

        if (err) {
            response(404, 'Data Detail Tidak Ditemukan', 'error', res)
        } else {
            response(200, result, 'SUCCESS', res)
        }
    })
})


// PORT 
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
