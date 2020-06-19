const path = require('path')
const { app,io ,express} = require('./config')



require('./db/mongoose')
require('./agenda/agenda')

//Routers
const userRouter = require('./routers/user')
const attackRouter = require('./routers/attack')
const adminRouter = require('./routers/admin')


const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '/views')

// // Socket io connection
// connectionIo(io)
require('./socketio/init_scoketio')



app.set('views', viewPath);
app.set('view engine', 'ejs');

app.use(express.json())

// Pass socket io to the routers
app.use((req, res, next) => {
    req.io = io
    next()
})

app.use(userRouter)
app.use(attackRouter)
app.use(adminRouter)

app.use(express.static(publicDirPath))


app.get('/', (req, res) => {
    res.render('index')
})
app.get('*', (req, res) => {
    res.render('404')
})



