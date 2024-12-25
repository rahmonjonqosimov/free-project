const userController = require('../controllers/user.controller')

const router = require('express').Router()

router.post('/create', userController.createUser)
router.get('/activate/:id', userController.activation)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)
router.get('/me', userController.me)
router.put('/update/:id', userController.update)
router.post('/forget-password', userController.forgetPassword)
router.put('/recover-password', userController.recoverPassword)

router.get('/get-all', userController.getAllUsers)

module.exports = router
