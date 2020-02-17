const mongoose= require('mongoose')

const setUpDB = () => {
    mongoose.connect('mongodb://localhost:27017/oct-contact-manager', { useNewUrlParser : true, useUnifiedTopology : true }, () => {
        console.log('coonnected to db')
    })
}

module.exports = setUpDB