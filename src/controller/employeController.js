const { employeModel } = require('../model/employeModel')
const response = require('../res/response')

// get All Employes and get by id
const getEmployes = async (req, res) => {
    try {
        const { id_employe } = req.query
        const { id_detail_employe } = req.query
        // console.log(id_detail_employe)
        // console.log(id_employe)

        if (id_employe) {
            // periksa apakah id employe ada pada database jika tidak maka respon error 404
            const [employeData] = await employeModel.selectEmployeByID(id_employe)
            if (employeData[0][0].result === "Karyawan tidak ditemukan") {
                return response(404, 'Karyawan Tidak Ada Pada Database', 'error', res)
            } else {
                return response(200, employeData[0], 'success', res)
            }

        } else if (id_detail_employe) {
            // periksa apakah id detail employe ada pada database view informasi_penyortir jika tidak respon error 404
            const employeData = await employeModel.viewInformationEmploye(id_detail_employe)
            if (employeData[0].length === 0) {
                return response(404, 'Informasi Karyawan Tidak Ditemukan', 'error', res)
            } else {
                return response(200, employeData[0], 'Detail Information Employe', res)
            }

        } else {
            // kondisi menampilkan semua employes
            const employeData = await employeModel.selectAllEmployes()
            return (
                response(200, employeData[0], 'success', res)
            )
        }

    } catch (error) {
        // jika getData pada try gagal ini akan ditampilkan
        response(500, 'Internal Server Error', 'error', res)
    }
}

// Updating position employe 
const updatePositionEmploye = async (req, res) => {
    try {
        const { id_employe, position } = req.body
        console.log(id_employe, position)

        if (!id_employe && !position) {
            return (
                response(400, 'Please Input id_employe & position', 'error', res)
            )
        } else if (!id_employe) {
            return (
                response(400, 'Please Input id_employe', 'error', res)
            )
        } else if (!position) {
            return (
                response(400, 'Please Input position', 'error', res)
            )
        } else {
            // Cek apakah karyawan ditemukan sebelum melakukan pembaruan
            const employeData = await employeModel.selectEmployeByID(id_employe);

            if (employeData[0].length === 0) {
                // Karyawan tidak ditemukan, kirim respons 404
                return response(404, 'Employe NOT FOUND', 'error', res);
            }

            const updateData = await employeModel.updatePositionEmploye(id_employe, position)
            return (
                response(200, updateData[0][0], 'Success change position', res)
            )
        }

    } catch (error) {
        response(500, 'Internal Server Error', 'error', res)
    }
}

module.exports = {
    getEmployes,
    updatePositionEmploye
}
