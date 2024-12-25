class UserDto {
	name
	email
	role
	avatar
	id
	is_activated
	created_at
	updated_at
	constructor(user) {
		this.name = user.name
		this.email = user.email
		this.role = user.role
		this.avatar = user.avatar
		this.id = user._id
		this.created_at = user.createdAt
		this.updated_at = user.updatedAt
		this.is_activated = user.isActivated
	}
}

module.exports = UserDto
