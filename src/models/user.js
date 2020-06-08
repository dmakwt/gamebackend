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
        type: String
    },

},
    {
        timestamps: true,
    }

)






userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() },process.env.JWT_SECRET)

    user.token = token
    await user.save()
    return token

}


userSchema.statics.findByCredentials = async (email, password)=>{
    const user = await User.findOne({ email: email })

    if(!user){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }
    
    return user
}

// Hash the plain text password before saving
userSchema.pre('save', async function(next){
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// // Deteting user
userSchema.pre('remove', async function(next){
    // const user = this

     

    next()
})


const User = mongoose.model('User', userSchema)



module.exports = User






