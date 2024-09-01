const path = require('path')
const { body } = require('express-validator');


const validations = [
    body('nombreCompleto')
        .notEmpty()
        .withMessage('Debes de ingresar tu nombre')
        .bail()
        .isLength({ min: 5, max: 20 })
        .withMessage("Debes ingresar tu nombre completo"),
    body('correo')
        .notEmpty()
        .withMessage('Debes de ingresar tu email')
        .bail()
        .isEmail()
        .withMessage('Debes escribir un formato de correo valido'),
    body('telefono')
        .notEmpty()
        .withMessage('Debes escribir un numero de telefono'),
    body('tipo_residente')
        .notEmpty()
        .withMessage('Debes de elegir una opcion'),
    body('apartamento')
        .notEmpty()
        .withMessage('Debes escribir un numero de apartamento'),
    body('password')
        .notEmpty()
        .withMessage('Debes de ingresar una contraseña')
        .bail()
        .isStrongPassword({minLength: 8})
        .withMessage("Tu contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un símbolo"),
    body('foto').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];

		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	})
]

module.exports = validations;