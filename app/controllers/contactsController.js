const Contact = require('../models/Contact')

module.exports.list = (req, res) => {
    const { user, token } = req
    Contact.find({ user : user._id })
        .then(contacts => {
            if(contacts) {
                res.send(contacts)
            } else {
                res.send({ notice : 'no contacts found'})
            }
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.create = (req, res) => {
    const { user } = req
    const body = req.body
    const contact = new Contact(body)
    contact.user = user._id
    contact.save()
        .then(contact => {
            if(contact){
                res.send(contact)
            } 
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.show = (req, res) => {
    const id = req.params.id
    const { user } = req
    Contact.findOne({ _id : id, user : user._id })
        .then(contact => {
            if(contact) {
                res.send(contact)
            }
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.update = (req, res) => {
    const id = req.params.id
    const { user } = req.user
    Contact.findByIdAndUpdate(id, req.body, { new : true})
        .then(contact => {
            if(contact){
                res.send(contact)
            }
        })
        .catch(err => {
            res.send(err)
        })
}


module.exports.destroy = (req, res) => {
    const id = req.params.id
    const { user } = req
    Contact.findOne({ _id : id, user : user._id })
        .then(contact => {
            if(contact) {
                res.send(contact)
            }
        })
        .catch(err => {
            res.send(err)
        })
}
