const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw Error('Email is invalid')
            }
        }
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
    },

    server:{
        type:String,
        required:true,
        default:'serverONE'
    
    },

    banned:{
        type:Boolean,
        default: false
    },

    bannedDate:{
        type: Date
    },

    bannedReason:{
        type:String
    },

    token: {
        type: String,
        required: true
    },

},
    {
        timestamps: true,
    }

)













const User = mongoose.model('User', userSchema)



module.exports = User






