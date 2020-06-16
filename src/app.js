const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

require('./db/mongoose')
require('./agenda/agenda')

const userRouter = require('./routers/user')
const attackRouter = require('./routers/attack')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const { connectionIo } = require('./socketio/init_scoketio')


const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '/views')

// Socket io connection
connectionIo(io)




app.set('views', viewPath);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.json())

// Pass socket io to the routers
app.use((req, res, next) => {
    req.io = io
    next()
})

app.use(userRouter)
app.use(attackRouter)

app.use(express.static(publicDirPath))





app.get('*', (req, res) => {
    res.render('404')
})

module.exports = app
