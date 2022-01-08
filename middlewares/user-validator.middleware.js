
const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');

const validateUserEmailExist = async ( req = request, res = response, next ) => {

    const { email } = req.body;

    try {
        
        const user = await User.findOne({ email });

        if( user ) {
            return res.status(400).json({
                ok: false,
                msg: `A user exist with this email.`
            });
        }   

        next();

    } catch (error) {   
        res.sendStatus(500);
    }
}

const validateUserEmailNotExist = async ( req = request, res = response, next ) => {

    const { email } = req.body;

    try {
        
        const user = await User.findOne({ email });

        if( !user ) {
            return res.status(401).json({
                ok: false,
                msg: `Invalid email or password.`
            });
        }   

        next();

    } catch (error) {   
        res.sendStatus(500);
    }
}

const validateUserPassword = async ( req = request, res = response, next ) => {

    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ email, available: true });

        const validPassword = bcrypt.compareSync( password, user.password);

        if( !user || !validPassword ) {
            return res.status(401).json({
                ok: false,
                msg: `Invalid email or password.`
            });
        }   

        next();

    } catch (error) {   
        res.sendStatus(500);
    }
}

const encryptUserPassword = async ( req = request, res = response, next ) => {

    try {
        
        const salt = bcrypt.genSaltSync();
        req.body.password = bcrypt.hashSync( req.body.password, salt);

        next();

    } catch (error) {   
        console.log(error)
        res.sendStatus(500);
    }

}



module.exports = {
    validateUserEmailExist,
    validateUserEmailNotExist,
    encryptUserPassword,
    validateUserPassword,
}
