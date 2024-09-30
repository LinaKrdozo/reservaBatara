let db = require('../db/models')

module.exports = {  
    getAll: async function() {
        try {
            return await db.Usuarios.findAll();
        } catch (error) {
            console.log(err);
            reject([])
        } 
    },

    getAllByPk: async function(idUsuario) {
        try {
            // Encuentra todos los detalles de reservas para el usuario
            const detallesReservas = await db.DetalleReservas.findAll({
                where: {
                    usuarios_idUsuarios: idUsuario
                }
            });
    
            // Extrae los IDs de reservas desde los detalles de reservas
            const idsReservas = detallesReservas.map(detalle => detalle.reserva_idReserva);
    
            // Encuentra todas las reservas usando los IDs extraídos
            const todasReservas = await db.Reservas.findAll({
                where: {
                    idReserva: idsReservas
                }
            });

            return todasReservas;
        } catch (error) {
            console.error(error);
            throw new Error('Error al obtener las reservas por usuario');
        }
    },
    getOneBy: async function(id) {
        try {
            return await db.Usuarios.findByPk(id);
        } catch (error) {
            console.log(error);
        } 
    },

    findByField: async function(valorCampo){

        try {
            let usuarioEncontrado = await db.Usuarios.findOne({
                where: {
                    correo: valorCampo 
                }
            });            
            return usuarioEncontrado
            
        } catch (error) {
            console.log("ERROR CAPTURADO EN SERVICE--->> ",error); 
        }  
    },

    save: async function(nuevoUsuario){
        let usuario = new Usuario(nuevoUsuario);
        let usuarioCreado= await db.Usuarios.create(usuario)
        return usuarioCreado.dataValues  
    },

    update: async function (body, id){
       
        try {
            let usuario = new Usuario(body);
            await db.Usuarios.update(usuario, {where: {idUsuarios: id}});
            body.id = id     
            return body
        } catch (error) {
            console.log(error);
            throw new Error("Un error");
        }
    },

    delete: async function (idUsuario) {
        try{

            let usuarioEliminado = await db.Usuarios.destroy({
                where: {
                    idUsuarios : idUsuario
                }
            })

            return usuarioEliminado

        } catch(error){
            console.log(error);
            throw new Error("Error al eliminar el usuario");
        }
    }

}

function Usuario({nombre_completo, password, correo, telefono, foto, tipo_residente, apartamento, rol_idRol}){
    this.nombre_completo = nombre_completo;
    this.password = password ;
    this.correo = correo;
    this.telefono = telefono;
    this.foto = foto ;
    this.tipo_residente = tipo_residente;
    this.apartamento = apartamento;
    this.rol_idRol = rol_idRol;
}
  
