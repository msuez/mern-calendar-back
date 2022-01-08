
const fs = require('fs');
const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Token not found.',
        });
    }

    try {
        
        const publicKey  = fs.readFileSync('./keys/public.pem', 'utf-8');
        const { uid, name } = jwt.verify(
            token,
            publicKey
        );

        req.uid = uid;
        req.name = name;

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token.',
        });
    }

    next();

}

module.exports = {
    validateJWT
}


