


const connectionIo = (io) => {

    io.on('connection', (socket) => {
        console.log(`User one connection: ${socket.id}`)
        socket.on('join', (data) => {
            console.log(data)
            // console.log(`Join: ${data.usernameID}`)
            // socket.join(data.usernameID)
        });

        io.emit('test')

        socket.on('disconnect', () => {
            console.log(`User one disconnected: ${socket.id}`)
        })
        
    })
    
}


module.exports = {
    connectionIo,
}