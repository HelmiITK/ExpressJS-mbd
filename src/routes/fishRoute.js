const router = require("express").Router()
const fishController = require('../controller/fishController')

router.route('/ikan')
    .get(fishController.getFish)
    .post(fishController.addfish)

router.route('/ikan/:id_ikan')
    .delete(fishController.deleteFishByID)

module.exports = router
