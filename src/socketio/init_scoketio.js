


const connectionIo = (io) => {

    io.on('connection', (socket) => {

        socket.on('join', (data) => {
            socket.join(data.usernameID)
        });


        socket.on('disconnect', () => {

        })
    })
}


module.exports = {
    connectionIo,
}