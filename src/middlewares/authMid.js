function authMid(req,res,next){
    if(!req.session.userLogged){
        return res.redirect('/usuarios/login')
    }
    next();
}

module.exports = authMid;