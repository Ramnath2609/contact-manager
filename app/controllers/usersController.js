const User = require('../models/User')


module.exports.register = (req, res) => {
    const body = req.body
    const user = new User(body)
    user.save()
        .then(user => {
            if(user){
                res.send(user)
            } 
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.login = (req, res) => {
    const { email, password } = req.body
    User.findByCredentials( email, password )
        .then(user => {
            return user.generateToken()
        })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.logout = (req, res) => {
    const { user, token } = req
    User.findOneAndUpdate({ _id : user._id } , { $pull : { tokens : { token : token }}})
        .then(user => {
            res.send({ notice : 'logged out' })
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.account = (req, res) => {
    const { user, token } = req
    User.findOne({ _id : user._id })
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.send(err)
        })
}
