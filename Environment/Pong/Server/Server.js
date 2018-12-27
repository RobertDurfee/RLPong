const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 21052

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set('json spaces', 2)

const routes = require('./Routes')
routes(app)

app.listen(port)

console.log('Pong API listening on port ' + port)