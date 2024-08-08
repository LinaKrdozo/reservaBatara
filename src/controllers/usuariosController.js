const usuariosService = require('../model/service/usuariosService')

module.exports = {
    getAllUsers: (req, res)=>{
        //hay que hacer la vista para todos los usuarios 
        res.send(usuariosService.getAll())
    },

    detalleUsuarios:(req,res)=>{
        //res.send(usuariosService.getOneBy(1))
        res.send(usuariosService.getOneBy(req.params.id))
    },

    

}