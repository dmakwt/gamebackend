const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const profileSchema = new mongoose.Schema({

    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
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
        maxlength:255
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
        type: INT,
        required: true,
        default: 0,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
          }
    },

    xp: {
        type: Number,
        required: true,
        default: 0
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
        type: INT,
        required: true,
        default: 0,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
          }
    },
    loses: {
        type: INT,
        required: true,
        default: 0,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
          }
    },

    userSkills:{
        type:Map,
        required:true,
        default: 
        {
        "strength":0,
        "armour":0,
        "agility":0,
        "constitution":0,
        "intelligence":0,
        "luck":0,
        }
    },

    usedItems:{
        type:Map,
        of:String,
        required:true,
        default: 
        {
        "helmet":"",
        "chest":"",
        "pants":"",
        "shoes":"",
        "weapon":"",
        "armor":"",
        "gloves":"",
        "ring":"",
        }
    }
    






},
    {
        timestamps: true,
    }

)













const Profile = mongoose.model('Profile', profileSchema)



module.exports = Profile






