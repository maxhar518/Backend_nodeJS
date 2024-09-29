const jwt = require('jsonwebtoken')
JWT_SECRET  = "1234"

const jwtAuthMiddleware = (req, res, next) => {

    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({error: "Token Not Found"})

    const token = req.headers.authorization.split(' ')[1]
    if(!token) return res.status(401).json({error:'unAuthorized'})
        try {
            const decoded = jwt.verify(token, JWT_SECRET)
            req.user = decoded
            next()
        } catch (error) {
            console.log(error);
            res.status(401).json({error:'Invalid Token'})
        }
}

const generateToken = (userdata) => {
    return jwt.sign(userdata, JWT_SECRET, {expiresIn: 86400})
}
module.exports = {jwtAuthMiddleware, generateToken}