const express = require('express')
require('./db/mongoose')
require('./agenda/agenda')
const path = require('path')
const userRouter = require('./routers/user')
const attackRouter = require('./routers/attack')

const app = express()


const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'/views')

console.log(publicDirPath)

app.use(express.json())


app.set('views', viewPath);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use(userRouter)
app.use(attackRouter)

app.use(express.static(publicDirPath))


app.get('*', (req, res) => {
    res.render('404',)

})

module.exports = app
