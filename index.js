const express = require('express')
const app = express()
const port = 3434
const router = require('./config/routes')
const setUpDB = require('./config/database')
const cors = require('cors')

setUpDB()
app.use(cors())
app.use(express.json())

app.use('/', router)


app.listen(port , () => {
    console.log('listening to port', port)
})