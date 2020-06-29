const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const uniqueValidator = require('mongoose-unique-validator');


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
    },
    nameAR:{
        type:String,
        required:true,
    },

    deceriptionEN:{
        type:String
    },
    deceriptionAR:{
        type:String
    },
    colors:{
        type:Array,
        required:true,
        default:[1,'#000000','#000000'] //[Opacity,Color1,Color2,...]
    },

    itemSkills:{
        strength:{
            _id:false,
            type:Number,
            required:true,
            default:0
        },
        defence:{
            _id:false,
            type:Number,
            required:true,
            default:0
        },
        agility:{
            _id:false,
            type:Number,
            required:true,
            default:0
        },
        constitution:{
            _id:false,
            type:Number,
            required:true,
            default:0
        },
        intelligence:{
            _id:false,
            type:Number,
            required:true,
            default:0
        },
        luck:{
            _id:false,
            type:Number,
            required:true,
            default:0
        },
        health:{
            _id:false,
            type:Number,
            required:true,
            default:0
        },
        energy:{
            _id:false,
            type:Number,
            required:true,
            default:0
        }
    },

    minRequiredLVL:{
        type: Number,
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
        default:10
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








itemSchema.plugin(uniqueValidator);




const Item = mongoose.model('Item', itemSchema)



module.exports = Item






