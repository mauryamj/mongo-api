const { body } = require('express-validator');

exports.createUserRules = [
    body('fullName')
        .notEmpty()
        .withMessage('Full Name is required'),

    body('email')
        .isEmail()
        .withMessage('Valid email is required'),

    body('businessName')
        .notEmpty()
        .withMessage('Business Name is required'),

    body('businessType')
        .notEmpty()
        .withMessage('Business Type is required'),
];
