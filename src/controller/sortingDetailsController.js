const { sortingDetailsModel } = require('../model/sortingDetailsModel')
const response = require('../res/response')

// get All sorting details
const getSortingDetails = async (req, res) => {
    try {
        const { id_detail_penyortiran } = req.query

        if (id_detail_penyortiran) {
            const [sortingDetailsData] = await sortingDetailsModel.selectSortingDetailsByID(id_detail_penyortiran)
            return response(200, sortingDetailsData[0], 'SUCCESS', res)
        } else {
            const [sortingDetailsData] = await sortingDetailsModel.selectAllSortingDetails()
            return response(200, sortingDetailsData[0], 'SUCCESS', res)
        }

    } catch (error) {
        response(500, 'Internal Server Error', 'Error', res)
    }
}

module.exports = {
    getSortingDetails
}

