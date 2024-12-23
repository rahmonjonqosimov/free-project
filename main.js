const express = require('express')
const app = express()

require('dotenv').config()

require('./start/db')()
require('./start/router')(app)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on ${PORT}`))
