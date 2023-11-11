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

const addEmployer = (id_perusahaan, nama_penyortir, jabatan) => {
    const query = `CALL InsertNewEmployer(${id_perusahaan}, '${nama_penyortir}', '${jabatan}')`
    return db.execute(query)
}

const deleteEmployer = (id_penyortir, nama_penyortir) => {
    const query = `CALL delete_penyortir_by_id_and_name(${id_penyortir}, '${nama_penyortir}')`
    return db.execute(query)
}

module.exports = {
    employeModel: {
        selectAllEmployes,
        selectEmployeByID,
        updatePositionEmploye,
        viewInformationEmploye,
        addEmployer,
        deleteEmployer
    }
}