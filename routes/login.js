const router = require('express').Router() 
require('dotenv').config()

router.get('/' ,(req,res)=>{
    res.render('login')
})

router.post('/' , (req,res)=>{
    const {username , password} = req.body
    
    if(username === 'sadanandftw' && password === 'ftw') {
        req.session.allow = true
      return res.redirect('/')
    }
    else {
        return res.redirect('/login')
    }
})
module.exports = router