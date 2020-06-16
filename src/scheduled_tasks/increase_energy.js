const Profile = require('../models/profile')

module.exports = (agenda) => {
    agenda.define('increase energy', { priority: 'high', concurrency: 10 }, async (job) => {
        console.log('Fire increase energy')

        const username = job.attrs.data;
        const myProfile = await Profile.findOne({ username: username })
    

        console.log('from username', myProfile.energy)
        const oldEnergy = myProfile.energy


        if (myProfile.energy === 100) {
            await job.remove()

            console.log('Energy full 100+')
            return
        }
        myProfile.energy = oldEnergy + 1
        await myProfile.save()

        job.repeatEvery('1 second')
        await job.save()

        console.log(`Enrgy 10+ :  The energy now: ${myProfile.energy}`)
    });
}