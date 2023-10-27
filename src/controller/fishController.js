const { fishModel } = require("../model/fishModel")
const response = require('../res/response')

// get all fish and type of fish
const getFish = async (req, res) => {
    try {
        const { jenis_ikan } = req.query
        const { history_fish } = req.query
        // console.log(history_fish)
        // console.log(jenis_ikan)

        if (jenis_ikan) {
            // periksa apakah jenis ikan adalah ikan air asin dan air tawar jika tidak maka respon error 404
            const [fishData] = await fishModel.selectJenisIkan(jenis_ikan)
            if (fishData[0][0].result === "Jenis ikan ini tidak ada di database") {
                return response(404, 'Tidak Ada Jenis Ikan Ini Di Database', 'error', res)
            } else {
                return response(200, fishData[0], 'success', res)
            }

        } else if (history_fish) {
            // periksa apakah ikan yang diinput ada pada database view history_ikan jika tidak maka respon error 404
            const fishData = await fishModel.viewHistoryFish(history_fish)
            if (fishData[0].length === 0) {
                return response(404, 'Tidak Ada History Untuk Ikan Ini', 'error', res)
            } else {
                return response(200, fishData[0], 'success', res)
            }

        } else {
            // tampilkan semua ikan
            const [fishData] = await fishModel.selectAll()
            return response(200, fishData[0], 'success', res)
        }

    } catch (error) {
        // jika getData pada try gagal ini akan ditampilkan
        response(500, 'Internal Server Error', 'error', res)
    }
}

// create/add fish into database sortir_ikan
const addfish = async (req, res) => {
    try {
        const { nama_ikan, berat, panjang, jenis_ikan, tanggal_penyortiran, kondisi_ikan } = req.body

        // periksa apakah semua data ada pada req.body
        if (!nama_ikan && !berat && !panjang && !jenis_ikan && !tanggal_penyortiran && !kondisi_ikan) {
            return (
                response(400, 'All data must be completed', 'error', res)
            )
        } else if (!nama_ikan) {
            return (
                response(400, 'Please input nama_ikan', 'error', res)
            )
        } else if (!berat) {
            return (
                response(400, 'Please input berat', 'error', res)
            )
        } else if (!panjang) {
            return (
                response(400, 'Please input panjang', 'error', res)
            )
        } else if (!jenis_ikan) {
            return (
                response(400, 'please input janis_ikan', 'error', res)
            )
        } else if (!tanggal_penyortiran) {
            return (
                response(400, 'Please input tanggal_penyortiran', res)
            )
        } else if (!kondisi_ikan) {
            return (
                response(400, 'Please input kondisi_ikan', 'error', res)
            )
        } else {
            // jika semua data lengkap barulah bisa ditambahkan datanya
            const [addData] = await fishModel.addfish(nama_ikan, berat, panjang, jenis_ikan, tanggal_penyortiran, kondisi_ikan)
            response(201, addData, 'Data added successfully', res)
        }

    } catch (error) {
        response(500, 'Internal server error', 'error', res)
    }
}

// Delete Fish by ID
const deleteFishByID = async (req, res) => {
    try {
        const { id_ikan } = req.params

        const [deleteFish] = await fishModel.deleteFish(id_ikan)
        if (deleteFish[0][0].result === "Ikan Tidak Ada Di Database") {
            return response(404, 'Ikan Tidak Ada Di Database', 'error', res)
        } else {
            return response(200, deleteFish[0], 'deleted successfully', res)
        }

    } catch (error) {
        response(500, 'Internal Server Error', 'error', res)
    }
}


module.exports = {
    getFish,
    addfish,
    deleteFishByID
}
