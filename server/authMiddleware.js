import jwt from 'jsonwebtoken'

const AuthMiddleware = (req, res, next) => {
    if (req.cookies.token) {
        jwt.verify(req.cookies.token, process.env.SECRET, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    res.clearCookie('token')
                    res.json({})
                } else {
                    req.sendStatus(500)
                }
            } else if (decoded) {
                req.body.id = decoded
                next()
            }
        })
    }
}

export default AuthMiddleware;