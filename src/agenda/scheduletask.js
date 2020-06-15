const Profile = require('../models/profile')
var Agenda = require('agenda');
var mongoConnectionString = process.env.MONGODB_URL
var myAgenda = new Agenda({db: {address: mongoConnectionString}});

myAgenda.define('reduce hp', {priority: 'high', concurrency: 1}, async (job, done)=> {
  
    const user = await Profile.findOne({username:'Nasser'})

    user.hp =  user.hp-10
    await user.save()
    console.log(user.hp)

  done(); // dont forget to call done!
});





myAgenda.on('ready', function() {
    myAgenda.every('5 seconds', 'reduce hp');
    myAgenda.start();
  });


  module.exports = myAgenda