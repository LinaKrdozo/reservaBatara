const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator');
const usuariosService = require('../model/service/usuariosService')
const rolService = require('../model/service/rolService');
const reservasService = require('../model/service/reservasService');

module.exports = {

	//** usuarios clientes */

	registro:(req,res)=>{
		return res.render('users/registro')
	},

	processRegistro: async (req, res) => {
		try {
			const resultValidation = validationResult(req);
		
			if (resultValidation.errors.length > 0) {
				return res.render('users/registro', {
					errors: resultValidation.mapped(),
					oldData: req.body
				});
			}

			let userInDb = await usuariosService.findByField(req.body.correo);

			if (userInDb) {
				return res.render('users/registro', {
					errors: {
						correo: {
							msg: 'Este correo electrónico ya está registrado'
						}
					},
					oldData: req.body
				});
			}
	
	
			let userToCreate = {
				...req.body,
				password: bcryptjs.hashSync(req.body.password, 10),
				foto: req.file.filename,
				rol_idRol: 2
			};

			let usuarioCreado = await usuariosService.save(userToCreate);
	
			return res.redirect('login');
		} catch (error) {
			console.log(error);
			return res.status(500).send("Error en el servidor");
		}
	},
	

	login:(req,res)=>{
		return res.render('users/login')
	},

	loginProcess: async (req, res)=>{
		try{

			let userToLogin = await usuariosService.findByField(req.body.correo)
		
			if(userToLogin){
				let userToPersistence = JSON.parse(JSON.stringify(userToLogin));
			
				let isOkThePassword = bcryptjs.compareSync(req.body.password, userToPersistence.password)
			
				if (isOkThePassword) {

					await usuariosService.update(userToLogin, userToPersistence.idUsuarios);
					delete userToPersistence.password;
					req.session.userLogged = userToPersistence;

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
		}catch(error){
			console.error("Error en el proceso de inicio de sesión:", error);
			return res.status(500).send("Hubo un error en el servidor.");
		}
		
	},

	perfil: async (req, res) => {
		try {
			console.log("Usuario en sesión:", req.session.userLogged);
	
			let reservasEnPerfil = await usuariosService.getAllByPk(req.session.userLogged.idUsuarios);
			if (reservasEnPerfil == undefined) {
				reservasEnPerfil = [];
			}
			
			let listaDeUsuarios = await usuariosService.getAll(); 
	
			return res.render('users/perfil', {
				usuario: req.session.userLogged,
				listaDeUsuarios: listaDeUsuarios,
				reservasEnPerfil: reservasEnPerfil
			});
		} catch (error) {
			console.error("Error al ingresar al perfil:", error);
			return res.status(500).send("Hubo un error en el servidor.");
		}
	},
	

	editProfile: async (req, res) => {
		try {
			const usuario = await usuariosService.getOneBy(req.params.id);
			res.render('users/editarPerfil', { 'usuario': usuario });
		} catch (error) {
			console.error("Error al editar el perfil:", error);
			return res.status(500).send("Hubo un error en el servidor.");
		}
	},
	updateProfile: async (req, res) => {
		try {
			const usuarioActual = await usuariosService.getOneBy(req.session.userLogged.idUsuarios);
			const reservasEnPerfil = await reservasService.getOneBy(req.session.userLogged.idUsuarios) || [];
	
			const cambios = {};
			let hayCambios = false;
	
			for (const campo in req.body) {
				if (req.body[campo] !== usuarioActual[campo]) {
					cambios[campo] = req.body[campo];
					hayCambios = true;
				}
			}
	
			if (req.file) {
				cambios.foto =  req.file.filename;
				hayCambios = true;
			}
	
			if (!hayCambios) {
				return res.redirect('/usuarios/perfil');
			}
	
			await usuariosService.update(cambios, req.session.userLogged.idUsuarios);
			
			const usuarioActualizado = await usuariosService.getOneBy(req.session.userLogged.idUsuarios);
			req.session.userLogged = usuarioActualizado; 
	
			res.render('users/perfil', { 'usuario': usuarioActualizado, 'reservasEnPerfil': reservasEnPerfil });
		} catch (error) {
			console.error("Error al actualizar el perfil:", error);
			return res.status(500).send("Hubo un error en el servidor.");
		}
	},
	
	logout:(req,res) =>{
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/')
	},

	//************ USUARIO ADMINISTRADOR *********/

    getAllUsers: async (req, res) =>{
		try {
        	let usuarios = await usuariosService.getAll();
			let rol= await rolService.getAllRoles();
			res.render('admin/usuariosAdmin', {listaDeUsuarios : usuarios, roles : rol})
		} catch(error){
			console.error("Error al autorizar ver los usuarios:", error);
			return res.status(500).send("Hubo un error en el servidor.");
		}
    },

    detalleUsuarios: async (req, res) => {
		try {
        	let usuario = await usuariosService.getOneBy(req.params.id);
			let rol= await rolService.getAllRoles();
        	res.render('admin/detalleUsuario',{ usuario : usuario, roles : rol })
		} catch(error){
			console.error("Error al obtener detalle del usuario:", error);
			return res.status(500).send("Hubo un error en el servidor.");
		}
    },
    create: async (req, res) => {
		try{
			let rol = await rolService.getAllRoles();
			res.render('admin/creacionUsuario', {roles: rol})
		} catch(error){
			res.send("Ha ocurrido un error inesperado").status(500);
		}
	},
	
	// Create -  Method to store
	store: async (req, res) =>  {

		try {
			if (req.file) {
				let usuario = req.body;
				usuario.password = bcryptjs.hashSync(req.body.password, 10),
				usuario.foto =  req.file.filename;
				
				await usuariosService.save(usuario);
			}
			const usuarios = await usuariosService.getAll()
			res.render("admin/usuariosAdmin", { 'listaDeUsuarios': usuarios });
		} catch (error) {
			console.error("Error al guardar usuario:", error);
			return res.status(500).send("Hubo un error en el servidor.");
		}
	},

    edit: async (req, res) => {
		try {
			let usuario = await usuariosService.getOneBy(req.params.id);
			let rol = await rolService.getAllRoles();
			res.render('admin/modificacionUsuarios',{ usuario : usuario, roles : rol })
		} catch (error) {
			console.error("Error al editar usuario:", error);
			return res.status(500).send("Hubo un error en el servidor.");
		}
	},
	
	
	// Update - Method to update
	update: async (req, res) => {
		try{
			let reserva = await reservasService.getOneBy(req.params.id);	
			if(req.file){
				let usuario = req.body;
				usuario.foto = 'img/imgUsuarios/' + req.file.filename;
			}
			await usuariosService.update(req.body,req.params.id);
			res.redirect('/usuarios/panelAdmin') 
		} catch (error) {
			console.error("Error al actualizar usuario:", error);
			return res.status(500).send("Hubo un error en el servidor.");
		}	
	},

    destroy : async (req, res) => {

		try{

			await usuariosService.delete(req.params.id);
        	const usuarios = usuariosService.getAll();
        	res.json({ success: true, usuarios: usuarios });

		}catch (error) {
			console.error("Error al eliminar usuario:", error);
			return res.status(500).send("Hubo un error en el servidor.");
		}
	}
}