const {body} = require('express-validator');
const path = require('path');

const usersMiddleware = [
body('name')
                .notEmpty().withMessage('* Enter your full name and surname').bail()
                .isLength({min: 4}).withMessage('* Enter at least 2 characters'),
body('country')
                .notEmpty().withMessage('* Enter your country of birth'),
body('email')
                .notEmpty().withMessage('* Enter your email').bail()
                .isEmail().withMessage('* Enter a valid email address'),
body('password')
                .notEmpty().withMessage('* Set a password').bail()
                .isLength({min: 8}).withMessage('* Your password must be at least 8 characters').bail()
]

module.exports = usersMiddleware;