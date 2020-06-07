const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const inventorySchema = new mongoose.Schema({


    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    items:{
        type:Array,
        required:true,
        default:[]
    },

    size:{
        type:Number,
        required:true,
        default:15
    },

    bag:{
        type:String,
        default:"bag1"
    }
    
},
    {
        timestamps: true,
    }

)













const Inventory = mongoose.model('Inventory', inventorySchema)



module.exports = Inventory






