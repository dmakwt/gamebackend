const mongoose = require('mongoose')
const validator = require('validator')



const employeeSchema = new mongoose.Schema({

    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    username: {
        type: String,
        required: true,
        ref: 'User'
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
    position: {
        type: String,
        required: true
    }
})




const Employee = mongoose.model('Employee', employeeSchema)



module.exports = Employee


