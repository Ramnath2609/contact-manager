const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema

const userSchema = new Schema ({
    username : {
        type : String,
        required : true,
        minlength : 5
    }, 
    email : {
        type : String,
        required : true,
        unique : true,
        validate : {
            validator : function (value) {
                return validator.isEmail(value)
            },
            message : function() {
                return 'enter a valid email'
            }
        }
    },
    mobile : {
        type : String,
        required : true,
        validate : {
            validator : function(value){
                return validator.isMobilePhone(value, ['en-IN'])
            }
        }
    },
    password : {
        type : String,
        required : true,
        minlength : 6
    },
    createdAt : {
        type : Date,
        default : new Date()
    },
    tokens : [
        {
            token : {
                type : String
            },
            createdAt : {
                type : Date,
                default : new Date()
            }
        }
    ]
})

//pre hooks
userSchema.pre('save', function(next){
    const user = this
    if(user.isNew){
        bcryptjs.genSalt(10)
            .then(salt => {
                bcryptjs.hash(user.password, salt)
                    .then(encrypted => {
                        user.password = encrypted
                        console.log(user)
                        next()
                    })
            })
    }else{
        next()
    }
})

// static methods
userSchema.statics.findByCredentials = function(email, password){
    const User = this
    return User.findOne({ email })
                .then(user => {
                    if(!user) {
                        return Promise.reject('invalid email or password')
                    }
                     return bcryptjs.compare( password, user.password )
                                    .then(value => {
                                        if(value){
                                            return Promise.resolve(user)
                                        }else{
                                            return Promise.reject("invalid email or password")
                                        }
                                    })
                })
                .catch(err => {
                    return Promise.reject(err)
                })
}

//instance method
userSchema.methods.generateToken = function(){
    console.log('within token')
    const user = this
    const tokenData = {
        _id : user._id,
        username : user.username,
        createdAt : Number(new Date)
    }
    const token = jwt.sign(tokenData, 'secret123')
    user.tokens.push({ token })
    return user.save()
            .then(user => {
                console.log(user, token)
                return Promise.resolve({ user, token })
            })
            .catch(err => {
                return Promise.reject(err)
            })
}


userSchema.statics.findByToken = function(token) {
    const User =  this
    let tokenData
    try {
        tokenData  = jwt.verify(token, 'secret123')
    } catch(err) {
        return Promise.reject(err)
    }
    return User.findOne({ _id : tokenData._id, 'tokens.token' : token })
        .then(user => {
            return Promise.resolve(user)
        })
        .catch(err => {
           return Promise.reject(err)
        })
}

const User = mongoose.model('User', userSchema)

module.exports = User