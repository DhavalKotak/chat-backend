const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const tokenVerify = (token) => {
    let result = jwt.verify(token,JWT_SECRET, (err, user) => {
        if(err)
            return false
        else
            return user
    })
    return result
}

module.exports = tokenVerify