const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const errorMiddleware = require('../middlewares/error.middleware')

module.exports = app => {
	app.use(
		cors({
			credentials: true,
			origin: process.env.CLIENT_URL,
		})
	)

	app.use(express.json())
	app.use(cookieParser({}))
	app.use(express.static('static'))
	app.use(fileUpload({}))

	// ROUTES
	app.use('/api/user', require('../routes/user.router'))

	// ERROR MIDDLEWARE
	app.use(errorMiddleware)
}
