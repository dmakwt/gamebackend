const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URL,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })



mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + process.env.MONGODB_URL);
});


mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error');
});


mongoose.connection.on('disconnected', function () {  
    console.log('Mongoose default connection disconnected'); 
  });