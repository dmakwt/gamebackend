const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const playerReportSchema = new mongoose.Schema({

    playerOne:{
        type:String,
        required:true
    },  

    playerTwo:{
        type:String,
        required:true
    },
    
    moneyAward: {
        type: Number,
        required: true,
        default: 0
    },

    playerOneHP: {
        type: Number,
        required: true,
    },

    playerTwoHP: {
        type: Number,
        required: true,
    },

    playerOneHPlose:{
        type: Number,
        required: true,
    },

    playerTwoHPlose:{
        type: Number,
        required: true,
    },

    winner:{
        type:String,
        required:true
    }

},
    {
        timestamps: true,
    }

)













const PlayerReport = mongoose.model('PlayerReport', playerReportSchema)



module.exports = PlayerReport






