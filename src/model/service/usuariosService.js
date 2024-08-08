//aqui va toda la logica 
const fs = require('fs');
const path = require('path');
//con el require y la ruta ya me parsea el archivo JSON
const usuarios = require('../../data/usuarios.json');

//const usuariosFilePath = path.join(__dirname, '../data/usuarios.json');
let usuariosService = {  
    
    usuarios: usuarios,

    //me retorna todos los usuarios del archivo JSON
    getAll: function(){
        return this.usuarios;
    },

    //me retorna un usuario por id
    getOneBy: function(id){
        
        // Convierte id a número para asegurarse de que sea del tipo correcto
        const idToCompare = Number(id);

        // Busca el usuario en el array de usuarios
        let usuarioEncontrado = this.usuarios.find((usuario) => usuario.idUsuarios === idToCompare);
        
        console.log("ID--->> ", idToCompare); 
        console.log("USUARIO-->>", usuarioEncontrado);
        
        return usuarioEncontrado;
    },

    save: function(usuario){
         let idMayor = usuarios.reduce((contador, usuario) => {
            if (usuario.id > contador) {
                return usuario.id;
            }
            return contador;
        }, 0);
        
        let idIncrementado = idMayor + 1;
        
        let NuevoUsuario = {
            id: idIncrementado,
            nombreCompleto: usuario.nombreCompleto,
            correo: usuario.correo,
            telefono: usuario.telefono,
            foto: usuario.foto,
            residente: usuario.residente,
            apartamento: usuario.apartamento,
            nombreRol: usuario.nombreRol
        };     

        //guardo el usuario en el array usuarios
        this.usuarios.push(NuevoUsuario);
        fs.writeFileSync(path.join(__dirname, '../../data/usuarios.json'), JSON.stringify(this.usuarios))
        return "OK"
    },

    update: function(formUsuarioActualizacion,id){
       
        let buscarUsuario = usuarios.find(buscarUsuario => buscarUsuario.id == id)
        
        if (buscarUsuario) {
            buscarUsuario.nombreCompleto = formUsuarioActualizacion.nombreCompleto;
            buscarUsuario.correo = formUsuarioActualizacion.correo;
            buscarUsuario.telefono = formUsuarioActualizacion.telefono;
            buscarUsuario.foto = formUsuarioActualizacion.foto;
            buscarUsuario.residente = formUsuarioActualizacion.residente;
            buscarUsuario.apartamento = formUsuarioActualizacion.apartamento;
            buscarUsuario.nombreRol = formUsuarioActualizacion.nombreRol;
        }

        fs.writeFileSync(path.join(__dirname, '../../data/usuarios.json'), JSON.stringify(this.usuarios))
        
        return buscarUsuario;

    },

    delete: function (id) {
        // contiene la nueva lista de usuarios sin incluir el que quiero eliminar    
        let nuevosUsuarios = this.usuarios.filter((usuario) => usuario.id != id);
        // sobreescribo la lista de usuarios por la nueva lista
        this.usuarios = nuevosUsuarios;
        fs.writeFileSync(path.join(__dirname, '../../data/usuarios.json'), JSON.stringify( this.usuarios))
        return nuevosUsuarios;
    }

}

module.exports = usuariosService;