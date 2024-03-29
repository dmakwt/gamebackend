const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const uniqueValidator = require('mongoose-unique-validator');


const inventorySchema = new mongoose.Schema({


    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    items:{
        type:Array,
        default:[]
    },

    size:{
        type:Number,
        default:500
    },

    bag:{
        type:String,
        default:"bag1"
    }
    
},
    {
        timestamps: true,
        _id: false
    }

)











inventorySchema.plugin(uniqueValidator);

const Inventory = mongoose.model('Inventory', inventorySchema)



module.exports = Inventory






