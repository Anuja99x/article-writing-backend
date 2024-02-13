const jwt = require('jsonwebtoken');

const verifyToken = async (req, res) => {
    let token, isTokenProvided = false;
    try {
        token = await req.header('Authorization').split(' ')[1];
        isTokenProvided = true;
    } catch (error) {
        res.status(401).json({
            message: 'No token provided!'
        });
        return false;
    }


    if (isTokenProvided) {
        let error;
        jwt.verify(token, 'jwt_secret_key', (err, decoded) => {
            error = err;
        });
        if (error) {
            res.status(401).json({
                message: error.message
            });
            return false;
        } else {
            return true;
        }
    }

};

module.exports = verifyToken;
