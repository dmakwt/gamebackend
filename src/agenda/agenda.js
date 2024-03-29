const Agenda = require('agenda')
const mongoose = require('mongoose')

var agenda = new Agenda({
     mongo: mongoose.connection ,
      db:{collection: 'scheduledTasks'},
      processEvery:'5 seconds'
    
    });

let jobTypes = ["increase_energy"];

// loop through the job_list folder and pass in the agenda instance to
// each job so that it has access to its API.
jobTypes.forEach(type => {
    // the type name should match the file name in the jobs_list folder
    require('../scheduled_jobs/' + type)(agenda)
})

if (jobTypes.length) {
    // if there are jobs in the jobsTypes array set up 
    agenda.start()
}

// let graceful = () => {
//     agenda.stop(() => process.exit(0));
// }


module.exports = agenda;