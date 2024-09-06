function guestMid(req,res,next){
    if(req.session.userLogged){
        return res.redirect('/usuarios/perfil')
    }
    next();
}

module.exports = guestMid;