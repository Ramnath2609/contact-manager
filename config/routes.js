const router = require('express').Router()
const usersController = require('../app/controllers/usersController')
const contactsController = require('../app/controllers/contactsController')
const authenticateUser = require('../app/middlewares/authentication')

router.post('/users/register', usersController.register)
router.post('/users/login', usersController.login)
router.delete('/users/logout', authenticateUser, usersController.logout)
router.get('/users/account', authenticateUser, usersController.account)



router.get('/contacts', authenticateUser, contactsController.list)
router.post('/contacts', authenticateUser, contactsController.create)
router.get('/contacts/:id', authenticateUser, contactsController.show)
router.delete ('/contacts/:id', authenticateUser, contactsController.destroy)


module.exports = router