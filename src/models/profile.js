const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const agenda = require('../agenda/agenda')



const profileSchema = new mongoose.Schema({

    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    usernameID: {
        type: String,
        required: true,
    },

    username: {
        type: String,
        required: true,
        trim: true,
        ref: 'User'
    },

    avatarURL: {
        type: String,
        trim: true,
    },


    bio: {
        type: String,
        trim: true,
        maxlength: 255
    },

    hp: {
        type: Number,
        required: true,
        default: 0
    },

    energy: {
        type: Number,
        required: true,
        default: 0
    },

    level: {
        type: Number,
        required: true,
        default: 0,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },

    xp: {
        type: Number,
        required: true,
        default: 0
    },

    skillPoints: {
        type: Number,
        default: 0,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    honor: {
        type: Number,
        required: true,
        default: 0
    },

    money: {
        type: Number,
        required: true,
        default: 0
    },

    wins: {
        type: Number,
        required: true,
        default: 0,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    loses: {
        type: Number,
        required: true,
        default: 0,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },

    userSkills: {
        strength: {
            _id: false,
            type: Number,
            default: 10
        },
        defence: {
            _id: false,
            type: Number,
            default: 10
        },
        agility: {
            _id: false,
            type: Number,
            default: 10
        },
        constitution: {
            _id: false,
            type: Number,
            default: 10
        },
        intelligence: {
            _id: false,
            type: Number,
            default: 10
        },
        luck: {
            _id: false,
            type: Number,
            default: 10
        }
    },

    usedItems: {
        helmet: {
            _id: false,
            type: String,
            default: ''
        },
        chest: {
            _id: false,
            type: String,
            default: ''
        },
        pants: {
            _id: false,
            type: String,
            default: ''
        },
        shoes: {
            _id: false,
            type: String,
            default: ''
        },
        weapon: {
            _id: false,
            type: String,
            default: ''
        },
        shield: {
            _id: false,
            type: String,
            default: ''
        },
        gloves: {
            _id: false,
            type: String,
            default: ''
        },
        ring: {
            _id: false,
            type: String,
            default: ''
        }
    }







},
    {
        timestamps: true,
        _id: false
    }

)

const runAgenda = async function(profile){

await agenda.create('increase energy', { userId: profile.usernameID, firstTime: true })
            .repeatEvery('10 seconds')
            .unique({ 'data.userId': profile.usernameID })
            .save();
}


profileSchema.pre('save', async function (next) {
    const profile = this
    // console.log(JSON.stringify(profile) )

    if (profile.isModified('energy')) {
        console.log('run')
        await runAgenda(profile)

    }

    next()
})







const Profile = mongoose.model('Profile', profileSchema)



module.exports = Profile






