const jwt = require('jsonwebtoken');
const config = require('./../config/config')

const Authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        // console.log(token)
        if(token){
            jwt.verify(token, config.SECRETKEY, (err, decode) => {
                if(err){
                    console.log(err)
                    res.status(500).json({
                        error: 'auth faild'
                    })
                }else{
                    if(decode){
                        req.user = decode
                        console.log(req.user)
                        next()
                    }
                }
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: 'Auth faild'
        })
    }
}

module.exports = Authenticate;