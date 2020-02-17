const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema

const contactSchema = new Schema ({
    name : {
        type : String,
        required : true
    }, 
    mobile : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        validate : {
            validator : function(value){
                return validator.isEmail(value)
            }
        }
    },
    dateOfBirth : {
        type : String
    },
    category : {
        type : String
    },
    user : {
        type : String
    }
})

const Contact = mongoose.model('Contact', contactSchema)
module.exports = Contact