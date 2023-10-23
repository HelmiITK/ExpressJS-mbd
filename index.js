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
            response(201, result, "success", res)
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
            if (err) throw err
            response(200, update, 'Jabatan Berhasil Diubah', res)
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

app.delete('/delete', (req, res) => {
    res.send('halaman delete')
})


// =========================TABEL KOLAM SORTIR==========================
// get All kolam sortir
app.get('/kolam_sortir', (req, res) => {
    db.query("CALL getALLKolamSortir()", (error, result) => {
        console.log({ dataKolam: result })
        response(200, result, 'SUCCESS', res)
    })
})

// get kolam by id
app.get('/kolam_sortir/:id_tempat', (req, res) => {
    const idTempat = req.params.id_tempat
    const sql = `CALL getKolamById(${idTempat})`

    db.query(sql, (err, finds) => {
        if (err) throw err
        response(200, finds, 'SUCCESS', res)
    })
})




app.delete('/delete', (req, res) => {
    res.send('halaman delete')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})