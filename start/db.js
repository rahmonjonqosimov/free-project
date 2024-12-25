const mongoose = require('mongoose')

module.exports = function () {
	mongoose
		.connect(
			'mongodb+srv://qosimovrahmonjon0927:Lx4bUjW56hWZia0l@cluster0.iz8ju.mongodb.net/<dbname>?retryWrites=true&w=majority'
		)
		.then(() => console.log('Connected to MongoDB'))
		.catch(err => console.log(err))
}
