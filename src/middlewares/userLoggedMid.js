const usuarioService = require('../model/service/usuariosService')

function userloggedMid(req,res,next){
    res.locals.isLogged = false;
    let emailInCookie = req.cookies.userEmail
    let userFromCookie = usuarioService.findByField('correo', emailInCookie);
 
     if (emailInCookie !== undefined) {
          req.session.userLogged = userFromCookie;
    }

    if (req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }
    next();
    
}

module.exports = userloggedMid;