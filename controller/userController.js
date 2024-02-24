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
            savedAt: Date.now(),
        });

        let userexists = false
        User.find({ email: req.body.email, name: req.body.name }).then(result => {
            if (result.length > 0) {
                const error = new Error("UserName & email already exist");
                resp.status(409).json(error);
                userexists = true;
            }
            if (!userexists) {
                userDto.save().then(result => {
                    let token;
                    try {
                        token = jwt.sign(
                            {
                                userId: userDto.userId,
                                username: userDto.name,
                                email: userDto.email,
                                type: userDto.type
                            },
                            "jwt_secret_key",
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
                                username: userDto.name,
                                email: userDto.email,
                                type: userDto.type,
                                token: token
                            },
                        });
                }).catch(error => {
                    resp.status(500).json(error);
                });
            }

        }).catch(error => {
            resp.status(500).json(error);
        });


    });

}

const loginUser = (req, resp, next) => {
    let { username, email, password } = req.body;

    User.findOne({ name: username, email: email }).then(existingUser => {
        if (existingUser) {
            bcrypt.compare(password, existingUser.password).then(result => {
                if (result) {
                    let token;
                    try {
                        //Creating jwt token
                        token = jwt.sign(
                            {
                                userId: existingUser.id,
                                username: existingUser.name,
                                email: existingUser.email,
                                type: existingUser.type
                            },
                            "jwt_secret_key",
                            { expiresIn: "1h" }
                        );
                    } catch (err) {//token error
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
                                username: existingUser.name,
                                email: existingUser.email,
                                type: existingUser.type,
                                token: token,
                            },
                        });
                } else {
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
        } else {
            resp.status(404).json({ message: "User not found" });
        }
    });

}





const updateUser = (req, res) => { }
const getAllUsers = (req, res) => {
    User.find().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json(error);
    });
}

const getAllWriters = (req, res) => {
    User.find({ type: "Writer" }).then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json(error);
    });
}

const getAllReaders = (req, res) => {
    User.find({ type: "Reader" }).then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json(error);
    });
}

const getOneUser = (req, res) => { }

const getUserCount = (req, res) => {
    let readerCount = 0, writerCount = 0;
    User.countDocuments({ type: "Reader" }).then(readerResult => {
        readerCount = readerResult;
        User.countDocuments({ type: "Writer" }).then(writerResult => {
            writerCount = writerResult;
            res.status(200).json([
                readerCount,
                writerCount
            ]);
        }).catch(err => {
            res.status(500).json(err);
        });
    }).catch(err => {
        res.status(500).json(err);
    });

}

const getUsersByUserName = (req, res) => {
    let { type, username } = req.params;
    if (username === " ") {
        User.find({ type: type }).then(result => {
            res.status(200).json(result);
        }).catch(error => {
            res.status(500).json(error);
        });
    } else {
        User.find({ name: { "$regex": "^" + username + "", "$options": "i" } }).then(result => {
            result = result.filter(user => user.type === type);
            res.status(200).json(result);
        }).catch(error => {
            res.status(500).json(error);
        });
    }
}

const getUserCountByMonthAndType = (req, res) => {
    let { type } = req.params;
    let date = new Date();
    let month = date.getMonth();
    const monthDigits = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
    User.countDocuments({
        "type": type,
        "savedAt": {
            "$gte": new Date("2024-"+monthDigits[month]+"-01T00:00:00Z"),
            "$lt": new Date("2024-"+monthDigits[month+1]+"-01T00:00:00Z")
        }
    }).then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json(error);
    });
}


module.exports = {
    saveUser,
    loginUser,
    updateUser,
    getAllUsers,
    getOneUser,
    getUserCount,
    getAllWriters,
    getAllReaders,
    getUsersByUserName,
    getUserCountByMonthAndType,
}
