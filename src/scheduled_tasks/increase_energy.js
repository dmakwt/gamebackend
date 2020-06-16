const Profile = require('../models/profile')

const clamp= (val, min, max) =>{
    return val > max ? max : val < min ? min : val;
}

module.exports = (agenda) => {
    agenda.define('increase energy', { priority: 'high', concurrency: 10}, async job => {

        const usernameID = job.attrs.data.userId;
        const myProfile = await Profile.findOne({ usernameID: usernameID })
        const oldEnergy = myProfile.energy


        if (myProfile.energy >= 100) {
            await job.remove()
            return
        }

        myProfile.energy = oldEnergy + 10
        myProfile.energy = clamp(myProfile.energy,0,100)
        await myProfile.save()

    });
}