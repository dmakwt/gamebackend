const path = require('path')
const { app,io ,express} = require('./config')



require('./db/mongoose')
require('./agenda/agenda')

const userRouter = require('./routers/user')
const attackRouter = require('./routers/attack')


const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '/views')

// // Socket io connection
// connectionIo(io)
require('./socketio/init_scoketio')



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



console.log('app.js file')
io.emit('test', 'teeeeest')


app.get('*', (req, res) => {
    res.render('404')
})


