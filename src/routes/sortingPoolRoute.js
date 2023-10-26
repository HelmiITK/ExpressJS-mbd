const router = require('express').Router()
const sortingPoolController = require('../controller/sortingPoolController')

router.route('/sortingpool')
    .get(sortingPoolController.getSortingPool)
    .put(sortingPoolController.handleUpdatePool)


module.exports = router