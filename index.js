const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const register = require('./api/auth/register')
const login = require('./api/auth/login')
const search = require('./data/search')
const friendlist = require('./data/friend/friendList')
const friendrequest = require('./data/friend/friendRequest')
const cors = require('cors')
require('dotenv').config()

app.use(bodyParser.json())
app.use(cors())
app.use('/auth',register)
app.use('/auth',login)
app.use('/search',search)
app.use('/friend',friendlist)
app.use('/friend',friendrequest)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})