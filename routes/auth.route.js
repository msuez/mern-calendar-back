
const { Router } = require('express');
const { check } = require('express-validator');

const { 
    validateFields, 
    validateUserEmailExist,
    validateUserEmailNotExist,
    encryptUserPassword,
    validateUserPassword,
    validateJWT,
} = require('../middlewares');

const {
    createNewUser,
    authenticateUser,
    renewAuthToken
} = require('./../controllers/auth.controller');

const router = Router();

router.post( '/new', [
    check( 'name', 'The name is required.' ).not().isEmpty(),
    check( 'email', 'The email is required.' ).isEmail(),
    validateUserEmailExist,
    check( 'password', 'The password is required. Must be longer than 6 characters.' ).not().isEmpty().isLength({ min: 6 }),
    encryptUserPassword,
    validateFields
], createNewUser );

router.post( '/', [
    check('email', 'The email is required.').isEmail(),
    validateUserEmailNotExist,
    check( 'password', 'The password is required. Must be longer than 6 characters.' ).not().isEmpty().isLength({ min: 6 }),
    validateUserPassword,
    validateFields
], authenticateUser );

router.get( '/renew', [
    validateJWT
], renewAuthToken );

module.exports = router;