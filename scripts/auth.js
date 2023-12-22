const Auth = (req,res,next) =>{
    if(req.session.allow){
        return next()
    }
    res.redirect('/login')
}

module.exports = Auth