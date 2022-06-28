const {body} = require('express-validator');
const path = require('path');

const usersMiddleware = [
body('name')
                .notEmpty().withMessage('* Ingrese su nombre y apellido completo').bail()
                .isLength({min: 2}).withMessage('* Ingreso al menos 2 caracteres'),
body('country')
                .notEmpty().withMessage('* Ingrese su país de nacimiento'),
body('email')
                .notEmpty().withMessage('* Ingrese su correo electrónico').bail()
                .isEmail().withMessage('* Ingrese un correo electrónico válido'),
body('password')
                .notEmpty().withMessage('* Defina una contraseña').bail()
                .isLength({min: 8}).withMessage('* Su contraseña debe tener al menos 8 caracteres').bail()
                .isStrongPassword().withMessage('* Defina una contraseña fuerte')
]

module.exports = usersMiddleware;