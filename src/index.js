const app = require('./app')
const port = process.env.PORT
require('./agenda/scheduletask')
// App Listen
app.listen(port,() => {
    console.log(`Server is up on port: ${port}`)
})




