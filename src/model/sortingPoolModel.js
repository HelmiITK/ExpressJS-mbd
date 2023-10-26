const db = require('../config/connection')

const selectAllPool = () => {
    const query = 'CALL getALLKolamSortir()'
    return db.execute(query)
}

const updatePool = (id_tempat, kapasitas_kolam) => {
    const query = `CALL UpdateKapasitasKolam(${id_tempat}, ${kapasitas_kolam})`
    return db.execute(query)
}

const getPoolById = (id_tempat) => {
    const query = `CALL CheckKolamByID(${id_tempat})`
    return db.execute(query)
}

module.exports = {
    sortingPoolModel: {
        selectAllPool,
        updatePool,
        getPoolById
    }
}
