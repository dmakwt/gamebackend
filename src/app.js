const path = require('path')
const { app,io ,express} = require('./config')
const cors = require('cors')


require('./db/mongoose')
require('./agenda/agenda')

//Routers
const userRouter = require('./routers/user')
const attackRouter = require('./routers/attack')
const itemRouter = require('./routers/item')
const adminRouter = require('./routers/admin')
const inventoryRouter = require('./routers/inventory')

const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '/views')

// // Socket io connection
// connectionIo(io)
require('./socketio/init_scoketio')



app.set('views', viewPath);
app.set('view engine', 'ejs');

/////////////////////////////
var corsOptions = {
    origin: 'http://localhost:4000',
  }
app.use(cors(corsOptions))
app.use(express.json())

// Pass socket io to the routers
app.use((req, res, next) => {
    req.io = io
    next()
})

app.use(userRouter)
app.use(attackRouter)
app.use(itemRouter)
app.use(adminRouter)
app.use(inventoryRouter)

app.use(express.static(publicDirPath))


app.get('/', (req, res) => {
    res.render('index')
})
app.get('*', (req, res) => {
    res.render('404')
})



