
const { request, response } = require('express');
const { validationResult } = require('express-validator');

const validateFields = ( req, res = response, next ) => {
    try {
        
        const errors = validationResult(req);
        
        if( !errors.isEmpty() ) {
            return res.status(400).json({
                ok: false,
                errors: errors.mapped()
            });
        }   

        next();

    } catch (error) {   
        res.sendStatus(500);
    }
}

module.exports = {
    validateFields
}
