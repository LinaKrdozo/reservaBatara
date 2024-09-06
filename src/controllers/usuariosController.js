const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator');
const usuariosService = require('../model/service/usuariosService')

module.exports = {

	//** usuarios clientes */

	registro:(req,res)=>{
		return res.render('users/registro')
	},

	processRegistro:(req,res)=>{
		const resultValidation = validationResult(req)
		
		if(resultValidation.errors.length >0){
			return res.render('users/registro',{
				//mapped me convierte el array de errores en un objeto literal
				errors: resultValidation.mapped(),
				oldData: req.body

			});
		}
		
		let userInDb = usuariosService.findByField('correo', req.body.correo);
		
		if(userInDb){
			return res.render('users/registro',{
				errors: {
					correo:{
						msg:'Este correo Electronico ya esta registrado'
					}
				},
				oldData: req.body

			});
		}

		let userToCreate = {
			...req.body, 
			password : bcryptjs.hashSync(req.body.password, 10),
			foto: req.file.filename,
			nombreRol: "Residente"
		}

		let usuarioCreado = usuariosService.save(userToCreate)

		return res.redirect('login')
	},

	login:(req,res)=>{
		return res.render('users/login')
	},

	loginProcess:(req,res)=>{
		let userToLogin = usuariosService.findByField('correo', req.body.correo)
		
		if(userToLogin){
			let userToSession = JSON.parse(JSON.stringify(userToLogin));
			
			let isOkThePassword = bcryptjs.compareSync(req.body.password, userToSession.password)
			
			if (isOkThePassword) {
				delete userToSession.password;
				req.session.userLogged = userToSession;

				if (req.body.remember) {
					res.cookie('userCorreo', req.body.correo, { maxAge: (1000 * 60) * 60 });
				}

				return res.redirect('/usuarios/perfil')
			}

			return res.render('users/login', {
				errors: {
					correo:{
						msg: 'Las credenciales son inválidas'
					}
				}
			});
		}

		return res.render('users/login', {
			errors: {
				correo:{
					msg: 'No se encuentra este correo electronico en nuestra base de datos'
				}
			}
		});
		
	},

	perfil:(req,res) =>{
		return res.render('users/perfil', {
			usuario:req.session.userLogged
		});
	},

	logout:(req,res) =>{
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/')
	},

	//************ USUARIO ADMINISTRADOR *********/

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
		res.redirect('/usuarios/panelAdmin')
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
		res.redirect('/usuarios/panelAdmin') 

	},

    destroy : (req, res) => {
	
		usuariosService.delete(req.params.id);
        const usuarios = usuariosService.getAll();
        res.json({ success: true, usuarios: usuarios });

	}
}