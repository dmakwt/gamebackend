


const connectionIo = (io) => {

    io.on('connection', (socket) => {

        socket.on('join', (data) => {
            socket.join(data.username)
        });


        socket.on('disconnect', () => {

        })
    })
}


module.exports = {
    connectionIo,
}