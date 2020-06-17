const Profile = require('../models/profile')

const clamp = (val, min, max) => {
    return val > max ? max : val < min ? min : val;
}

module.exports = (agenda) => {
    agenda.define('increase energy', { priority: 'high', concurrency: 10 }, async job => {

        const usernameID = job.attrs.data.userId;
        const myProfile = await Profile.findOne({ usernameID: usernameID })
        const oldEnergy = myProfile.energy
        /////////////////////////////////fix
        
        if (job.attrs.data.firstTime === false) {
            myProfile.energy = oldEnergy + 10
            myProfile.energy = clamp(myProfile.energy, 0, 100)
            await myProfile.save()

        }

        if (oldEnergy >= 100) {
            console.log('Done')
            await job.remove()
            return
        }



        job.attrs.data.firstTime = false


        // const lastRunAt = Date.parse(job.attrs.lastRunAt)
        // const nextRunAt = Date.parse(job.attrs.nextRunAt)
        // const timer = new Date(nextRunAt - lastRunAt)

        // console.log('timer ', timer.getMinutes(), ' minutes')


    });
}