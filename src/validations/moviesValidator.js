const {check} = require('express-validator');

module.exports = [
    check('title')
        .notEmpty().withMessage('Tienes que escribir un título').bail(),
    check('rating')
        .notEmpty().withMessage('Tienes que escribir una calificación').bail()
        .isFloat({min: 0, max: 10}).withMessage('La calificación debe ser un número entre 0 y 10'),

    check('awards')
        .notEmpty().withMessage('Tienes que escribir una cantidad de premios').bail()
        .isInt({min: 0}).withMessage('El premio debe ser un número mayor a 0'),

    check('release_date')
        .notEmpty().withMessage('Tienes que escribir una fecha de estreno').bail()
        .isDate().withMessage('La fecha de estreno debe ser una fecha válida'),

    check('length')
        .isInt({min: 0}).withMessage('La duración debe ser un número mayor a 0')
        
]