const db = require("../config/connection")

const selectAll = () => {
    const query = "CALL getAllikan()"
    return db.execute(query)
}

const selectJenisIkan = (jenis_ikan) => {
    const query = `CALL getikanbyjenis_ikan('${jenis_ikan}')`
    return db.execute(query)
}

const addfish = (nama_ikan, berat, panjang, jenis_ikan, tanggal_penyortiran, kondisi_ikan) => {
    const query = `CALL InsertNewIkan('${nama_ikan}', '${berat}', '${panjang}', '${jenis_ikan}', '${tanggal_penyortiran}','${kondisi_ikan}')`
    return db.execute(query)
}

const deleteFish = (id_ikan) => {
    const query = `CALL DeleteIkanByID('${id_ikan}')`
    return db.execute(query)
}

const viewHistoryFish = (history_fish) => {
    const query = `SELECT * FROM history_ikan WHERE nama_ikan = '${history_fish}'`
    return db.execute(query)
}

module.exports = {
    fishModel: {
        selectAll,
        selectJenisIkan,
        addfish,
        deleteFish,
        viewHistoryFish
    }
}