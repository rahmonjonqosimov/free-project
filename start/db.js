const mongoose = require('mongoose')

module.exports = function () {
	mongoose
		.connect(process.env.DB_URL)
		.then(() => console.log('Connected to MongoDB'))
		.catch(err => console.log(err))
}
