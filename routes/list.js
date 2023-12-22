const router = require('express').Router() 
const queryModel = require('../models/query')
const Auth = require('../scripts/auth')

router.get('/' ,Auth ,async(req,res)=>{

    const routesListsss = await queryModel.find() 
    const routeList = [...routesListsss]
    res.render('list' ,{routeList: routeList})
})


module.exports = router