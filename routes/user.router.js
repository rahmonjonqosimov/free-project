const userController = require('../controllers/user.controller')
const userModel = require('../models/user.model')

const router = require('express').Router()

router.get('/get-all', userController.getAllUsers)
router.post('/create', userController.createUser)

module.exports = router
