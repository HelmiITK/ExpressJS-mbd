const db = require('../config/connection')

const selectAllSortingDetails = () => {
    const query = 'CALL getALLDetailPenyortiran()'
    return db.execute(query)
}

const selectSortingDetailsByID = (id_detail_penyortiran) => {
    const query = `CALL getDetailPenyortiranById(${id_detail_penyortiran})`
    return db.execute(query)
}


module.exports = {
    sortingDetailsModel: {
        selectAllSortingDetails,
        selectSortingDetailsByID
    }
}

