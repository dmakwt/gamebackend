const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const itemSchema = new mongoose.Schema({

    itemType:{
        type:String,
        required:true,
    },
    imgID:{
        type:String,
        required:true,
    },
    nameEN:{
        type:String,
        required:true,
        unique:true
    },
    nameAR:{
        type:String,
        required:true,
        unique:true
    },
    colors:{
        type:Array,
        required:true,
        default:[0,'#000000','#000000']
    },

    itemSkills:{
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
        "health":0,
        "energy":0
        }
    },

    minRequiredLVL:{
        type: INT,
        required: true,
        default: 0,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
          }
    },

    itemSize:{
        type:Number,
        required:true,
        default:10
    },

    buyPrice:{
        type:Number,
        required:true,
        default:100
    },

    gemsPrice:{
        type:Number,
        required:true,
        default:0
    },

    sellPrice:{
        type:Number,
        required:true,
        default:50
    },

    saleable:{
        type:Boolean,
        required:true,
        default:true
    },

    auctionStartPrice:{
        type:Number,
        required:true,
        default:0
    }




    
},
    {
        timestamps: true,
    }

)













const Item = mongoose.model('Item', itemSchema)



module.exports = Item






