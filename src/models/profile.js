const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { io } = require('../config')

process.em
const profileSchema = new mongoose.Schema({

    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    position: {
        type: String,
        required: true,
        default: 'player'
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

    showLeaderboard: {
        type: Boolean,
        default: true
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
    gems:{
        type: Number,
        required: true,
        default: 0,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
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




profileSchema.pre('save', async function () {
    const profile = this
    

    if (profile.isModified('energy') || profile.isModified('hp') || profile.isModified('money') || profile.isModified('xp') || profile.isModified('avatarURL') || profile.isModified('gems')) {
        io.to(`${profile.usernameID}`).emit('statusAppbarChanged', JSON.stringify(profile))
    }

})





const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile






