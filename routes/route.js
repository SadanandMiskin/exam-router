const router = require('express').Router() 
const queryModel = require('../models/query')
const Auth = require('../scripts/auth')

let msg = ""

router.get('/', Auth , async (req, res) => {
    const routesListsss = await queryModel.find() 
   const routeList = [...routesListsss]
    res.render('index' , {msg: msg , routesList: routeList})
})

router.post('/post', async (req, res) => {
    const {
        route,
        message
    } = req.body
    try {
        const exists = await queryModel.findOne({
            route
        })
        if (exists) {
            msg = "Route registered, Try New Route"
            return res.redirect('/')
        }

        else {
            msg = ""
            await queryModel.create({
                route: route,
                message: message
            })
            
        }

        
        console.log('Success')
        res.redirect(`/${route}`)
    } catch (err) {
        console.error(err)
    }
    // app.get(`/${route}` , (req,res) => {
    //     res.send(message)
    // })
    // res.redirect(`/${route}`)
})



router.get('/:route', async (req, res) => {
    const {
        route
    } = req.params
    console.log(route)
    try {
        const query = await queryModel.findOne({
            route
        })
        if (query) {
            res.send(query.message)
            console.log(query.message)

        } else {
            res.status(404).send('Not found')
        }

    } catch (err) {
        console.log(err)
    }
})


router.post('/logout' , (req,res)=>{
    req.session.destroy((err)=>{
        res.redirect('/login')
    })
})

module.exports = router