const fs = require('fs');
const jwt = require('jsonwebtoken');

const generateJWT = ( uid, name ) => {
        
    return new Promise((resolve, reject) => {

        const payload = { uid, name };

        const privateKey  = fs.readFileSync('./keys/private.pem', 'utf-8');
        const signOptions = { 
            expiresIn: '1h', 
            algorithm: 'RS256' 
        };

        jwt.sign(payload, privateKey, signOptions, (err, token) => {

            if( err ) {
                console.log(err);
                reject(`We cant generate the token.`);
            }

            resolve(token);

        });

    });
    
}

module.exports = {
    generateJWT
}