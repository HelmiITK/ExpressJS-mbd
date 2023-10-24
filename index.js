const express = require('express')
const bodyParser = require('body-parser')
const response = require('./response')
const db = require('./connection')

const app = express()
const port = 3005

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('halaman utama')
})

// ===========================TABEL IKAN==============================
// procedure getAllikan
app.get('/ikan', (req, res) => {
    db.query("CALL getAllikan()", (error, result) => {
        console.log({ dataIkan: result })
        if (error) throw error

        response(200, result, "success", res)
    })
})

// procedure getikanbjenis_ikan
app.get('/ikan/:jenis_ikan', (req, res) => {
    const jenis_ikan = req.params.jenis_ikan
    const sql = `CALL getikanbyjenis_ikan ('${jenis_ikan}')`

    db.query(sql, (err, finds) => {
        if (err) throw err
        response(200, finds, 'SUCCESS', res)
    })
})

// Tambah Ikan baru 
app.post('/ikan', (req, res) => {
    const { body } = req

    db.query(`CALL InsertNewIkan(
                                    '${body.nama_ikan}', 
                                    '${body.berat}', 
                                    '${body.panjang}', 
                                    '${body.jenis_ikan}', 
                                    '${body.tanggal_penyortiran}',
                                    '${body.kondisi_ikan}')`,
        (error, result) => {
            console.log(error)
            response(201, result, "Data Ikan Berhasil Ditambahkan", res)
        })
})

// Delete ikan by ID
app.delete('/ikan/:id_ikan', (req, res) => {
    const { params } = req
    const sql = `CALL DeleteIkan(${params.id_ikan})`

    db.query(sql, (err, result) => {
        if (err) {
            response(404, "Ikan Not Found", "error", res)
        } else {
            response(200, result, "Data Ikan Berhasil Dihapus", res)
        }
    })
})


// ========================TABEL PENYORTIR=========================
// get all karyawan penypertir
app.get('/penyortir', (req, res) => {
    db.query("CALL getALLPenyortir()", (error, result) => {
        console.log({ dataIkan: result })
        response(200, result, "success", res)
    })
})

// get penyortir by id
app.get('/penyortir/:id_penyortir', (req, res) => {
    const id_penyortir = req.params.id_penyortir
    const sql = `CALL getPenyortirById(${id_penyortir})`

    db.query(sql, (error, fields) => {
        console.log({ karyawan: fields })

        if (error) throw error
        response(200, fields, 'SUCCESS', res)
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
            response(200, result, 'Data Berhasil Dihapus', res)
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


// get kolam sortir by id
app.get('/kolam_sortir/:id_tempat', (req, res) => {
    const idTempat = req.params.id_tempat
    const sql = `CALL getKolamById(${idTempat})`

    db.query(sql, (err, result) => {
        console.log(result)
        if (err) throw err

        response(200, result, 'SUCCESS', res)
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
            response(201, data, 'Kapasitas Kolam Berhasil Diperbarui', res)
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



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})