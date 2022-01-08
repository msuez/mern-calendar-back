
const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');
const { generateJWT } = require('../helpers/jwt.helper');

const createNewUser = async ( req = request, res = response, next ) => {
    try {

        const user = new User( req.body);

        await user.save();

        // Generate JWT
        const token = await generateJWT(user.id, user.name);

        return res.status(201).json({
            ok: true,
            msg: 'User created.',
            user,
            token
        });

    } catch (error) {
        return res.sendStatus(500);
    }
}

const authenticateUser = async ( req = request, res = response, next ) => {
    
    const { email } = req.body;

    try {

        const user = await User.findOne({
            email,
            available: true
        });

        const newToken = await generateJWT(user.id, user.name);

        return res.json({
            ok: true,
            msg: 'Authentication',
            user,
            token: newToken
        });

    } catch (error) {
        return res.sendStatus(500);
    }
}

const renewAuthToken = async ( req = request, res = response, next ) => {
    try {
        
        const {uid, name} = req;

        const newToken = await generateJWT();

        console.log(newToken);

        return res.json({
            ok: true,
            msg: 'Renew token',
            token: newToken
        });

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

module.exports = {
    createNewUser,
    authenticateUser,
    renewAuthToken
}