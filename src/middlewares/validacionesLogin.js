const path = require('path')
const { body } = require('express-validator');


const validations = [
    body('correo')
        .notEmpty()
        .withMessage('Debes de ingresar tu email')
        .bail()
        .isEmail()
        .withMessage('Debes escribir un formato de correo valido'),
    body('password')
        .notEmpty()
        .withMessage('Debes de ingresar una contraseña')
        .bail()
        .isStrongPassword({minLength: 8})
        .withMessage("Tu contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un símbolo"),
    
]

module.exports = validations;