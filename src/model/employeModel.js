const db = require('../config/connection')

const selectAllEmployes = () => {
    const query = 'CALL getALLPenyortir()'
    return db.execute(query)
}

const selectEmployeByID = (id_employe) => {
    const query = `CALL CheckKaryawanByID(${id_employe})`
    return db.execute(query)
}

const updatePositionEmploye = (id_employe, position) => {
    const query = `CALL UpdateJabatanPenyortir(${id_employe}, '${position}')`
    return db.execute(query)
}

const viewInformationEmploye = (id_detail_employe) => {
    const query = `SELECT * FROM informasi_penyortir WHERE id_penyortir = ${id_detail_employe}`
    return db.execute(query)
}

module.exports = {
    employeModel: {
        selectAllEmployes,
        selectEmployeByID,
        updatePositionEmploye,
        viewInformationEmploye
    }
}