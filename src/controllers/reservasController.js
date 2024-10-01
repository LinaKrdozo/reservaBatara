const { EagerLoadingError } = require("sequelize");
const { validationResult } = require('express-validator');
const reservasService= require("../model/service/reservasService");
const detalleService = require("../model/service/detalleService")
const usuariosService = require("../model/service/usuariosService")
const rolesService = require("../model/service/rolService")
const { transporter } =  require('../model/db/config/mailer')

module.exports ={
	/************* METODOS USUARIO **********/
	detailReservaUser: async function(req, res) {
		try {
			let reserva = await reservasService.getOneBy(req.params.id);
			let detalleReserva = await detalleService.getOneDetail(req.params.id)
			res.render('reservas/detalleReservasPerfil',{ reserva : reserva, detalleReserva : detalleReserva })
		}catch(error){
			res.send("Ha ocurrido un error inesperado").status(500); 
		}
	},

	createReserva: (req, res) => {
		res.render('reservas/creacionReserva')
	},
	
	// Create -  Method to store
	storeReserva: async function(req,res){
		try{
			let reserva = {
				...req.body,
				disponibilidad: "pendiente"
			  };

			  let rol = await rolesService.getAllRoles();
			
			let reservasEnPerfil = await usuariosService.getAllByPk(req.session.userLogged.idUsuarios)
			if (reservasEnPerfil == undefined) {
				reservasEnPerfil = []
			}
			
        	if (req.file) {
            	reserva.foto_pago = 'img/imgReservas/' + req.file.filename;
        	} else {
            	reserva.foto_pago = null;
        	}

        	await reservasService.save(reserva, req.session.userLogged.idUsuarios);
        	res.render('users/perfil', { usuario : req.session.userLogged,
				'reservasEnPerfil': reservasEnPerfil,
				'roles': rol
			});
		}catch(error){
			console.log(error);
            res.send("Ha ocurrido un error inesperado al guardar la reserva").status(500);
		}
	},
	
	/************* METODOS ADMIN **********/
	
	getAllReservas: async function (req, res){
		try {
			let reservas = await reservasService.getAll();
			res.render('admin/reservasAdmin', {listaDeReservas:reservas})
		}catch(error){
			res.send("Ha ocurrido un error inesperado").status(500);
		}

	},

	detail: async function(req, res) {
		try {
			let reserva = await reservasService.getOneBy(req.params.id);
			let detalleReserva = await detalleService.getOneDetail(req.params.id)

			let usuarioId = detalleReserva.usuarios_idUsuarios;
			let usuario = await usuariosService.getOneBy(usuarioId);
			res.render('admin/detalleReserva',{ reserva:reserva, detalleReserva : detalleReserva, usuario : usuario })
		}catch(error){
			res.send("Ha ocurrido un error inesperado").status(500); 
		}
	},

	create: (req, res) => {
		res.render('admin/creacionReservaAdmin')
	},
	
	// Create -  Method to store
	store: async function(req, res) {
		try {
			let reserva = req.body;

			if (req.file) {
				reserva.foto_pago = 'img/imgReservas/' + req.file.filename;
			} else {
				reserva.foto_pago = null;
			}
			await reservasService.save(reserva,req.session.userLogged.idUsuarios);
			res.redirect('/reservas');
		} catch (error) {
			console.error(error);  
			res.status(500).send("Ha ocurrido un error inesperado");
		}
	},
	// Update - Form to edit
	edit: async function(req, res) {
		try{
			let reserva  = await reservasService.getOneBy(req.params.id);
			let detalleReserva = await detalleService.getOneDetail(req.params.id)
			res.render('admin/modificacionReservaAdmin',{ reserva:reserva, detalleReserva: detalleReserva  })
		}catch(error){
			res.send("Ha ocurrido un error inesperado").status(500);
		}
	},
	// Update - Method to update
	update: async function(req, res) {
		try{
			let reserva = req.body;
			if(req.file){
				reserva.foto_pago = 'img/imgReservas/' + req.file.filename;
			}
				await reservasService.update(req.body,req.params.id);

				let detalleReserva = await detalleService.getOneDetail(req.params.id); 
        		let usuarioId = detalleReserva.usuarios_idUsuarios; 

        		let usuario = await usuariosService.getOneBy(usuarioId);
        		if (!usuario) {
            		return res.status(404).send("Usuario no encontrado.");
        		}

        		let destinatario = usuario.correo; 

				try {
					await transporter.sendMail({
						from: '"Servicio de notificaciones" <reservabataraprueba@gmail.com>',
						to: destinatario,
						subject: "Estado de la reserva ✔",
						text: `Su reserva para el dia ${reserva.fecha_evento}, ha sido actualizada a: ${reserva.disponibilidad}`,
					});
				} catch (sendError) {
					console.error('Error al enviar el correo:', sendError);
					return res.status(500).send("Error al enviar el correo de notificación.");
				}
			
			res.redirect('/reservas') 

		}catch(error){
			console.error(error);
            return res.status(500).send("Ha ocurrido un error inesperado al guardar la reserva");
		}
	},
	// Delete - Delete one booking from DB
	destroy : async function(req,res){
		try {
			const reserva = await reservasService.getOneBy(req.params.id);
			if (!reserva) {
				return res.status(404).send("Reserva no encontrada.");
			}
	
			const detalleReserva = await detalleService.getOneDetail(req.params.id); 
			let usuarioId = detalleReserva.usuarios_idUsuarios; 
			let usuario = await usuariosService.getOneBy(usuarioId);
			if (!usuario) {
				return res.status(404).send("Usuario no encontrado.");
			}

			const destinatarios = [
				'reservabataraprueba@gmail.com',
				usuario.correo 
			];

			await transporter.sendMail({
				from: '"servicio de notificaciones" <reservabataraprueba@gmail.com>',
				to: destinatarios, 
				subject: "Reserva Cancelada ✔",
				text: `La reserva con fecha ${reserva.fecha_evento} ha sido cancelada por el usuario con el correo: ${req.session.userLogged.correo}.`,
			});
			console.log('Correo enviado con éxito.');
	
			await reservasService.delete(req.params.id);
			const reservas = await reservasService.getAll();
	
			res.json({ success: true, reservas: reservas });
		} catch (error) {
			console.error(error);  
			res.status(500).send("No se pudo eliminar."); 
		} 
	}
};

