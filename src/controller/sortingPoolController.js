const { sortingPoolModel } = require('../model/sortingPoolModel')
const response = require('../res/response')

const getSortingPool = async (req, res) => {
    try {
        const { id_tempat } = req.query
        console.log(id_tempat)

        if (id_tempat) {
            const [poolData] = await sortingPoolModel.getPoolById(id_tempat)
            if (poolData[0][0].result === "Kolam sortir tidak ditemukan") {
                return response(404, 'Sorting Pool Is Not found', 'error', res)
            } else {
                return response(200, poolData[0][0], 'success', res)
            }
        } else {
            const [poolData] = await sortingPoolModel.selectAllPool()
            return response(200, poolData, 'SUCCESS', res)
        }
    } catch (error) {
        response(500, 'Internal Server Error', 'error', res)
    }
}

const handleUpdatePool = async (req, res) => {
    try {
        const { id_tempat, kapasitas_kolam } = req.body
        console.log(id_tempat, kapasitas_kolam)

        if (!id_tempat && !kapasitas_kolam) {
            return (
                response(400, 'Please Input id_tempat & Kapasitas_kolam', 'error', res)
            )
        } else if (!id_tempat) {
            return (
                response(400, 'Please Input id_tempat', 'error', res)
            )
        } else if (!kapasitas_kolam) {
            return (
                response(400, 'Please Input Kapasitas_kolam', 'error', res)
            )
        } else {
            // cek apakah sebelum melakukan update apakah kolam by id ada pada database jika tidak ada respon error 404
            const [updateData] = await sortingPoolModel.getPoolById(id_tempat)
            if (updateData[0][0].result === "Kolam sortir tidak ditemukan") {
                return response(404, 'Sorting Pool Is Not Found', 'error', res)
            } else {
                // jika data by id ada dan dan kapasitas_kolam diinput ini akan dijalankan 
                const updateData = await sortingPoolModel.updatePool(id_tempat, kapasitas_kolam)
                return response(200, updateData[0][0], 'Success Change Capacity Pool', res)

            }
        }

    } catch (error) {
        response(500, 'Internal Server Error', 'error', res)
    }
}

module.exports = {
    getSortingPool,
    handleUpdatePool
}