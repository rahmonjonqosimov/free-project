const userService = require('../services/user.service')

class UserController {
	// get-all users
	async getAllUsers(req, res, next) {
		try {
			const users = await userService.getAllUsers(req, res)
			return res.status(200).json(users)
		} catch (error) {
			next(error)
		}
	}

	// create user
	async createUser(req, res, next) {
		try {
			const user = await userService.createUser(req, res)
			return res.status(201).json(user)
		} catch (error) {
			next(error)
			console.log(error)
		}
	}
}

module.exports = new UserController()
