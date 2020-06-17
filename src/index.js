const { server} = require('./config')
const port = process.env.PORT
require('../src/app')

// App Listen
server.listen(port,() => {
    console.log(`Server is up on port: ${port}`)
})





console.log('index.js file')