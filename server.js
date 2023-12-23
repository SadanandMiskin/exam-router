require('dotenv').config()

const db = require('./config/db')
const queryModel = require('./models/query')

const route = require('./routes/route')
const login = require('./routes/login')
const list = require('./routes/list')

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
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({
    extended: true
}))
app.set('view engine', 'ejs')

app.use('/login' , login)
app.use('/list' , list )

app.get('/publiclist' ,async (req,res)=>{
    const routesListsss = await queryModel.find() 
    const routeList = [...routesListsss]
    res.render('publiclist' ,{routeList: routeList})
    
})

app.post('/remove/:id' , async(req,res)=>{
    const id = req.params.id
    await queryModel.findOneAndDelete({_id: id})
    res.redirect('/list')
})

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
