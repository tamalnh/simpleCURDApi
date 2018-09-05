const User = require('./../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('./../config/config')

const getAllUser = (req, res, next) => {
    User.find()
        .then(result => {
            if(result){
                res.status(200).json({
                    message: `${result.length} user found`,
                    users: result
                })
            }
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: "error occurred"
            })
        })

}

const signupUser = (req, res, next) => { 
    User.findOne({email: req.body.email})
        .then(result => {
            if(!result){
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err){
                        console.log(err)
                        res.status(500).json({
                            error: 'Password hasing faild',
                        })
                    }else{
                        if(hash) {
                            const user = new User({
                                email: req.body.email,
                                password: hash
                            })

                            user.save()
                                .then(result => {
                                    if(result){
                                        res.status(200).json({
                                            message: " user signup successfull",
                                            user: result
                                        })
                                    }else{
                                        res.status(500).json({
                                            error: 'user signup faild'
                                        })
                                    }
                                }).catch(err => {
                                    console.log(err)
                                    res.status(500).json({
                                        error: 'error occurred'
                                    })
                                })
                        }
                    }
                })
            }else{
                res.status(500).json({
                    error: 'User already exits'
                })
            }
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: 'Error occurred'
            })
        })
}

const signinUser = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then(result => {
            console.log(result)
            if(result){
                bcrypt.compare(req.body.password, result.password, (err, user) => {
                    if(err) {
                        console.log(err)
                        res.status(500).json({
                            error: 'password hashing faild',
                        })
                    }else{
                        if(user){
                            jwt.sign({
                                _id: result._id,
                                email:result.email
                                
                            }, config.SECRETKEY,{
                                expiresIn: '1h'
                            }, (err, token) => {
                                if(err){
                                    console.log(err)
                                    res.status(500).json({
                                        error: "error occurred"
                                    })
                                }else{
                                    if(token){
                                        res.status(200).json({
                                            message: 'user logged in successfully',
                                            token: token
                                        })
                                    }
                                }
                            })
                        }
                    }
                })
            }else{
                res.status(404).json({
                    error: 'email or password dont match'
                })
            }
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: 'error occurred',
            })
        })
}

module.exports = {
    getAllUser, 
    signupUser,
    signinUser
}