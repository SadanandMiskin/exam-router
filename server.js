require('dotenv').config()

const db = require('./config/db')
const queryModel = require('./models/query')

const route = require('./routes/route')
const login = require('./routes/login')

const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')


const app = express()

app.use(session({
    secret: 'Sadanandmiskin',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
    }
}))
app.use(bodyParser.urlencoded({
    extended: true
}))
app.set('view engine', 'ejs')

app.use('/login' , login)
app.use('/' , route)


app.listen(3000, async () => {
    try {
        await db
            .then(
                console.log('Server is listening')
            )
    } catch (err) {
        console.error(err)
    }
})