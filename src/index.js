const server = require('./app')
const port = process.env.PORT

// App Listen
server.listen(port,() => {
    console.log(`Server is up on port: ${port}`)
})




