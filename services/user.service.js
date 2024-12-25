const UserDto = require('../dtos/user.dto')
const BaseError = require('../errors/base.error')
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const tokenService = require('../services/token.service')
const mailService = require('./mail.service')

class UserService {
	// get all users
	async getAllUsers(req, res) {
		// limit and page
		const { limit, page } = req.query

		const users = await userModel
			.find()
			.skip((parseInt(page) - 1) * parseInt(limit))
			.limit(parseInt(limit))
		const userCount = await userModel.countDocuments()
		const userDto = users.map(user => new UserDto(user))
		return {
			users: userDto,
			user_count: userCount,
			page: +page,
			limit: +limit,
		}
	}

	// crete user
	async createUser(req, res) {
		const { name, email, password, avatar } = req.body

		const userExists = await userModel.findOne({ email })
		if (userExists) {
			throw BaseError.BadRequestError(`User with ${email} already exist`)
		}

		const hashPassword = await bcrypt.hash(password, 10)
		const role = 'user'
		const user = await userModel.create({
			name,
			email,
			password: hashPassword,
			role,
			avatar,
		})
		const userDto = new UserDto(user)
		// mail servise
		await mailService.sendActivationMail(
			email,
			`${process.env.API_URL}/api/user/activate/${userDto.id}`
		)

		// token
		const tokens = tokenService.generateToken({ ...userDto })
		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return { user: userDto, ...tokens }
	}

	async activation(userId) {
		const user = await userModel.findById(userId)
		if (!user) {
			throw BaseError.BadRequestError('User not found')
		}
		user.isActivated = true
		await user.save()
		return user
	}

	async login(email, password) {
		const user = await userModel.findOne({ email })
		if (!user) {
			throw BaseError.BadRequestError('User not found')
		}
		const isValidPassword = await bcrypt.compare(password, user.password)
		if (!isValidPassword) {
			throw BaseError.BadRequestError('Invalid password')
		}
		const userDto = new UserDto(user)
		const tokens = tokenService.generateToken({ ...userDto })
		await tokenService.saveToken(userDto.id, tokens.refreshToken)
		return { user: userDto, ...tokens }
	}

	async logout(refreshToken) {
		const token = await tokenService.removeToken(refreshToken)
		return token
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw BaseError.UnauthorizedError()
		}
		const userData = tokenService.validateRefreshToken(refreshToken)
		if (!userData) {
			throw BaseError.UnauthorizedError()
		}
		const tokenFromDb = await tokenService.findToken(refreshToken)
		if (!tokenFromDb) {
			throw BaseError.UnauthorizedError()
		}
		const user = await userModel.findById(tokenFromDb.user)
		const userDto = new UserDto(user)
		const tokens = tokenService.generateToken({ ...userDto })
		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return { user: userDto, ...tokens }
	}

	async me(refreshToken) {
		if (!refreshToken) {
			throw BaseError.UnauthorizedError()
		}
		const userData = tokenService.validateRefreshToken(refreshToken)
		if (!userData) {
			throw BaseError.UnauthorizedError()
		}
		const tokenFromDb = await tokenService.findToken(refreshToken)
		if (!tokenFromDb) {
			throw BaseError.UnauthorizedError()
		}
		const user = await userModel.findById(tokenFromDb.user)
		const userDto = new UserDto(user)
		return userDto
	}

	async update(id, body) {
		const existUser = await userModel.findById(id)
		if (!existUser) {
			throw BaseError.BadRequestError('User not found')
		}
		const { name, email } = body

		const user = await userModel.findByIdAndUpdate(
			id,
			{ name, email },
			{ new: true }
		)

		const userDto = new UserDto(user)

		return userDto
	}

	async forgetPassword(email) {
		if (!email) {
			throw BaseError.BadRequestError('Email is required')
		}
		const user = await userModel.findOne({ email })
		if (!user) {
			throw BaseError.BadRequestError('User with this email not found')
		}
		const userDto = new UserDto(user)
		const tokens = tokenService.generateToken({ ...userDto })
		const resetPasswordLink = `${process.env.CLIENT_URL}/recovery-account/${tokens.accessToken}`
		await mailService.sendForgotPasswordMail(email, resetPasswordLink)

		return 200
	}

	async recoverPassword(token, password) {
		if (!token) {
			throw BaseError.BadRequestError('Something went wrong with token')
		}
		const userData = tokenService.validateAccessToken(token)
		if (!userData) {
			throw BaseError.UnauthorizedError()
		}
		const hashPassword = await bcrypt.hash(password, 10)
		await userModel.findOneAndUpdate(
			userData.id,
			{ password: hashPassword },
			{ new: true }
		)
		return 200
	}
}

module.exports = new UserService()
