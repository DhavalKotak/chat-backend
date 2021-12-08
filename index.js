const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const http = require('http').Server(app)
const cors = require('cors')
const register = require('./api/auth/register')
const login = require('./api/auth/login')
const search = require('./data/search')
const friendlist = require('./data/friend/friendList')
const friendrequest = require('./data/friend/friendRequest')
const { joinChat,sendMessage } = require('./socket/socket')

const io = require('socket.io')(http, {
	cors: {
	  origin: "http://localhost:3000",
	  methods: ["GET", "POST"],
	  credentials: false
	}
})

require('dotenv').config()

io.on('connection',socket => {
    console.log('user connected ' + socket.id)
    socket.on('joinChat', (token, friend) => {
        joinChat(socket, token, friend)
    })
    socket.on('sendMessage',(message, chat_id) => {
        sendMessage(socket, chat_id, message)
    })
})

app.use(bodyParser.json())
app.use(cors())
app.use('/auth',register)
app.use('/auth',login)
app.use('/search',search)
app.use('/friend',friendlist)
app.use('/friend',friendrequest)

const PORT = process.env.PORT

http.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})