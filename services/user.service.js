const UserDto = require('../dtos/user.dto')
const BaseError = require('../errors/base.error')
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const tokenService = require('../services/token.service')

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

		// token
		const tokens = tokenService.generateToken({ ...userDto })

		await tokenService.saveToken(userDto.id, tokens.refreshToken)
		return { user: userDto, ...tokens }
	}
}

module.exports = new UserService()
