const router = require('express').Router()
const employeController = require('../controller/employeController')

router.route('/employe')
    .get(employeController.getEmployes)
    .put(employeController.updatePositionEmploye)
    .post(employeController.handleAddEmlpoyer)
    .delete(employeController.handleDeleteEmployer)

module.exports = router