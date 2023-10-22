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

// get kolam sortir
app.get('/penampungan', (req, res) => {
    db.query("select * from kolam_sortir", (error, result) => {
        console.log({ dataKolam: result })
        response(200, result, 'SUCCESS', res)
    })
})

// get penyortir by id
app.get('/user/:id_penyortir', (req, res) => {
    const id_penyortir = req.params.id_penyortir
    const sql = `SELECT * FROM penyortir WHERE id_penyortir = ${id_penyortir}`

    db.query(sql, (error, fields) => {
        console.log({karyawan: fields})

        if (error) throw error
        response(200, fields, 'SUCCESS', res)
    })
})

//get procedure InsertNewIkan
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
        response(200, result, "success", res)
    })
})


app.put('/edit', (req, res) => {
    res.send('halaman edit')
})

app.delete('/delete', (req, res) => {
    res.send('halaman delete')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})