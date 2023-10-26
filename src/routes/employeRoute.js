const router = require('express').Router()
const employeController = require('../controller/employeController')

router.route('/employe')
    .get(employeController.getEmployes)
    .put(employeController.updatePositionEmploye)

module.exports = router