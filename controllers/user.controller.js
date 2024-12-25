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
			res.cookie('refreshToken', user.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			})
			return res.status(201).json(user)
		} catch (error) {
			next(error)
			console.log(error)
		}
	}
	async activation(req, res, next) {
		try {
			const userId = req.params.id
			await userService.activation(userId)
			return res.redirect(process.env.CLIENT_URL)
		} catch (error) {
			next(error)
		}
	}

	async login(req, res, next) {
		try {
			const { email, password } = req.body
			const user = await userService.login(email, password)
			res.cookie('refreshToken', user.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			})
			return res.status(200).json(user)
		} catch (error) {
			next(error)
		}
	}

	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			const token = await userService.logout(refreshToken)
			res.clearCookie('refreshToken')
			return res.status(200).json(token)
		} catch (error) {
			next(error)
		}
	}

	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			const token = await userService.refresh(refreshToken)
			res.cookie('refreshToken', token.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			})
			return res.status(200).json(token)
		} catch (error) {
			next(error)
		}
	}

	async me(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			const user = await userService.me(refreshToken)
			return res.status(200).json(user)
		} catch (error) {
			next(error)
		}
	}

	async update(req, res, next) {
		try {
			const userId = req.params.id
			const user = await userService.update(userId, req.body)
			return res.status(200).json(user)
		} catch (error) {
			next(error)
		}
	}

	async forgetPassword(req, res, next) {
		try {
			const { email } = req.body
			const user = await userService.forgetPassword(email)
			return res.status(200).json(user)
		} catch (error) {
			next(error)
		}
	}

	async recoverPassword(req, res, next) {
		try {
			const { token, password } = req.body
			await userService.recoverPassword(token, password)
			return res.status(200).json({ message: 'Password changed' })
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new UserController()
