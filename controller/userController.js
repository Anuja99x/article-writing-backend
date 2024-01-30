const User = require('../model/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saveUser = (req, resp, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const userDto = new User({
            userId: req.body.userId,
            email: req.body.email,
            name: req.body.name,
            type: req.body.type,
            password: hash,
        });
        userDto.save().then(result => {
            let token;
            try {
                token = jwt.sign(
                    {
                        userId: userDto.userId,
                        email: userDto.email,
                        type: userDto.type
                    },
                    "jwt_secret_ket",
                    { expiresIn: "1h" }
                );
            } catch (err) {
                const error =
                    new Error("Error! Something went wrong.", err);
                return next(error);
            }
            resp
                .status(201)
                .json({
                    success: true,
                    data: {
                        userId: userDto.userId,
                        email: userDto.email,
                        type: userDto.type,
                        token: token
                    },
                });
        }).catch(error => {
            resp.status(500).json(error);
        });
    });

}

const loginUser = (req, resp, next) => {
    let { email, password } = req.body;

    try {
            User.findOne({ email: email }).then(existingUser => {
                bcrypt.compare(password, existingUser.password).then(result => {
                    if(result){
                        let token;
                        try {
                            //Creating jwt token
                            token = jwt.sign(
                                {
                                    userId: existingUser.id,
                                    email: existingUser.email,
                                    type: existingUser.type
                                },
                                "jwt_secret_ket",
                                { expiresIn: "1h" }
                            );
                        }catch (err) {//token erro
                            console.log(err);
                            const error =
                                new Error("Error! Something went wrong.");
                            return next(error);
                        }
                        resp
                    .status(200)
                    .json({
                        success: true,
                        data: {
                            userId: existingUser.id,
                            email: existingUser.email,
                            type: existingUser.type,
                            token: token,
                        },
                    });
                    }else{
                        const error =  //password error
                        Error(
                            "Wrong details please check at once"
                        );
                    return next(error);
                    }

                }).catch(err => { //bcrypt error
                    const error =
                    Error(
                        "Wrong details please check at once"
                    );
                return next(error);
                });
                
            });
    } catch {
        const error = //findone error
            new Error(
                "Error! Something went wrong."
            );
        return next(error);
    }

    
}





const updateUser = (req, res) => { }
const getAllUsers = (req, res) => { }
const getOneUser = (req, res) => { }

module.exports = {
    saveUser,
    loginUser,
    updateUser,
    getAllUsers,
    getOneUser
}
