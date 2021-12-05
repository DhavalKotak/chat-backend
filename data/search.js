const router = require('express').Router()
const db = require('./db')
const tokenVerify = require('../api/auth/jwt')

router.post('/', async (req, res) => {
    let username = req.body.user
    let authHeader = req.headers.authorization
    let token = authHeader.split(' ')[1]
    const result = tokenVerify(token)
    if(result === false){
        res
        .json({message: "Invalid Token!"})
    }else{
        db.query(`SELECT USERNAME FROM USERS WHERE USERNAME = '${username}'`,(err , results) => {
            if(err)
                res.status(500)
            else if(results.length === 0){
                res
                .status(200)
                .json({message: "No result found"})
            }else{
                res
                .status(200)
                .json({message: results})
            }
        })
    }
})

module.exports = router