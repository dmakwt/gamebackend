
const { io } = require('../config')




io.on('connection', (socket) => {

    socket.on('join', (usernameID) => {
        socket.join(`${usernameID}`)
        console.log(`${usernameID}: join`)
    });


    socket.on('disconnect', () => {
        console.log(`User one disconnected: ${socket.id}`)
    })

})



