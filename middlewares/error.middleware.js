const BaseError = require('../errors/base.error')

module.exports = function (err, req, res, next) {
	if (res.headersSent) {
		return next(err)
	}
	if (err instanceof BaseError) {
		return res
			.status(err.status)
			.json({ message: err.message, errors: err.errors })
	}
	return res.status(500).json({ message: `Server error` })
}
