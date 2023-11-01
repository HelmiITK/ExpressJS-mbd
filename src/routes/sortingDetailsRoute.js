const router = require('express').Router()
const sortingDetailsController = require('../controller/sortingDetailsController')

router.route('/sortingdetails')
    .get(sortingDetailsController.getSortingDetails)

module.exports = router