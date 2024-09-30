const usuarioService = require('../model/service/usuariosService')

const userloggedMid = async (req, res, next) =>{
    res.locals.isLogged = false;
    let emailInCookie = req.cookies.userEmail
    
     if (emailInCookie !== undefined) {
        try {
            let userFromCookie = await userService.findByField(emailInCookie);
            console.log("user from Cookie--> ", userFromCookie);
            if (userFromCookie) {
                req.session.userLogged = userFromCookie;
            }
        } catch (error) {
            console.error("Error al buscar el usuario por cookie: ", error);
        }

        //req.session.userLogged = usuarioService.findByField(emailInCookie);
    }

    if (req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }
    next();
    
}

module.exports = userloggedMid;