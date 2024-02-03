const jwt = require('jsonwebtoken');

const  verifyToken = async (req, res) => {
    const token = req.header('Authorization').split(' ')[1];
    //console.log(token);

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, 'jwt_secret_key', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }

        // Token is valid, you can access the decoded data here
        return true
    });
};

module.exports = verifyToken;
