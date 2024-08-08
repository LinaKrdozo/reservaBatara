const { EagerLoadingError } = require("sequelize");
const reservasService= require("../model/service/reservasService")

module.exports ={
	
	getAllReservas: (req, res) => {
		//res.send(productService.getAll())
		let reservas = reservasService.getAll();
		res.render('admin/reservasAdmin', {listaDeReservas:reservas})
	},

	detail: (req, res) => {
		//res.send(productService.getOneBy(req.params.id)).status(200)
		let reserva = reservasService.getOneBy(req.params.id);
		res.render('admin/detalleReserva',{ reserva:reserva })
	},
	// Create - Form to create
	//para peticion post, primero tengo que renderizar el formulario sobre el cual va a digitar los datos el usuario
	create: (req, res) => {
		res.render('admin/creacionReservaAdmin')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let reserva = req.body;
		reserva.fotoPago = 'img/imgReservas/' + req.file.filename;
		reservasService.save(reserva);
		res.redirect('/admin')
	},
	// Update - Form to edit
	edit: (req, res) => {
		let reserva  = reservasService.getOneBy(req.params.id);
		res.render('admin/modificacionReservaAdmin',{ reserva:reserva  })
	},
	// Update - Method to update
	update: (req, res) => {

		if(req.file){
			let reserva = req.body;
			reserva.fotoPago = 'img/imgReservas/' + req.file.filename;
		}

		reservasService.update(req.body,req.params.id);
		res.redirect('/admin') 

	},
	// Delete - Delete one booking from DB
	destroy : (req, res) => {
	
		reservasService.delete(req.params.id);
        const reservas = reservasService.getAll();
        res.json({ success: true, reservas: reservas });

	}
};

