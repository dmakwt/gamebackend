const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const messageSchema = new mongoose.Schema({

    from:{
        type:String,
        required:true
    },

    to:{
        type:String,
        required:true
    },
    
    title:{
        type:String,
        required:true,
        maxlength:35
    },

    body:{
        type:String,
        required:true,
        maxlength:255
    },
    
},
    {
        timestamps: true,
    }

)













const Message = mongoose.model('Message', messageSchema)



module.exports = Message






