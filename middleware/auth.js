const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = async (req, res,next) => {
    let token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            message: 'No token provided!'
        });
    }else if (token.startsWith('Bearer ')){
        token = await req.header('Authorization').split(' ')[1];
    }               
    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode;
        next();
    }catch(error){
        res.status(400).json({
            message: error.message
        });
    }
};

module.exports = auth;
