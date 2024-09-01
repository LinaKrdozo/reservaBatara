const { validationResult } = require('express-validator');
const usuariosService = require('../model/service/usuariosService')

module.exports = {

	//** usuarios clientes */

	registro:(req,res)=>{
		return res.render('usuarios/registro')
	},

	processRegistro:(req,res)=>{
		const resultValidation = validationResult(req)
		
		if(resultValidation.errors.length >0){
			console.log('Errores de validación:', resultValidation.mapped())
			return res.render('usuarios/registro',{
				//mapped me convierte el array de errores en un objeto literal
				errors: resultValidation.mapped(),
				oldData: req.body

			})
			
		}
	},

	login:(req,res)=>{
		return res.render('usuarios/login')
	},

	perfil:(req,res) =>{
		return res.render('usuarios/perfil')
	},

	//**usuario administrador */

    getAllUsers: (req, res)=>{
        //res.send(usuariosService.getAll())
        let usuarios = usuariosService.getAll();
		res.render('admin/usuariosAdmin', {listaDeUsuarios:usuarios})
    },

    detalleUsuarios:(req,res)=>{
        //res.send(usuariosService.getOneBy(1))
        let usuario = usuariosService.getOneBy(req.params.id);
        res.render('admin/detalleUsuario',{ usuario:usuario })
    },
    create: (req, res) => {
		res.render('admin/creacionUsuario')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let usuario = req.body;
		usuario.foto = 'img/imgUsuarios/' + req.file.filename;
		usuariosService.save(usuario);
		res.redirect('/usuarios')
	},
    edit: (req, res) => {
		let usuario  = usuariosService.getOneBy(req.params.id);
		res.render('admin/modificacionUsuarios',{ usuario:usuario })
	},
	// Update - Method to update
	update: (req, res) => {

		if(req.file){
			let usuario = req.body;
			usuario.foto = 'img/imgUsuarios/' + req.file.filename;
		}

		usuariosService.update(req.body,req.params.id);
		res.redirect('/usuarios') 

	},

    destroy : (req, res) => {
	
		usuariosService.delete(req.params.id);
        const usuarios = usuariosService.getAll();
        res.json({ success: true, usuarios: usuarios });

	}
}