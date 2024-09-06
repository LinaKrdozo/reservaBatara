//middleware que determina acceso segun el rol
let credentialsMid = {
    adminMid: function(req, res, next){
        if(req.session.userLogged == undefined || req.session.userLogged.nombreRol != "Administrador" ){
            res.send("No tienes permiso para ver esta pagina").status(401);
        }
        next();
    }
}

module.exports = credentialsMid;