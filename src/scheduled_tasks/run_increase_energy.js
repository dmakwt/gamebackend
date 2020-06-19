const agenda = require('../agenda/agenda')




const increaseEnergy = async (profile, repeateTime) => {
    await agenda.create('increase energy', { userId: profile.usernameID })
        .repeatEvery(repeateTime, { skipImmediate: true })
        .unique({ 'data.userId': profile.usernameID })
        .save();

}


module.exports = { increaseEnergy } 