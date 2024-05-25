const admin = (req, res, next) => {
    if (req.user.type !== 'Admin') {
        return res.status(403).json({
        message: 'Access denied!'
        });
    }
    next();
    };
module.exports = admin;