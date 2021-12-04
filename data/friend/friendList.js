const router = require("express").Router();
const db = require('../db')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

router.post('/list',(req, res) => {
    const username = req.body.username
    const authHeader = req.headers.authorization
    const token = authHeader.split(' ')[1]
    console.log(`list requested by ${username}`)
    jwt.verify(token, JWT_SECRET , (err, user) => {
        if(err){
            res
            .json({message: "Invalid Token!"})
        }else if(user.user == username){
            console.log(`sending list to ${username}`)
            db.query(`SELECT USER FROM FRIENDLIST WHERE FRIEND = '${username}' UNION SELECT FRIEND FROM FRIENDLIST WHERE USER = '${username}'`,(error, results) => {
                if(error){
                    res.status(500)
                    console.log(error)
                }else{
                    console.log(results)
                    res
                    .status(200)
                    .json({message: results})
                }
            })
        }else{
            res
            .json({message: "Stolen Token"})
        }
    })
})

module.exports = router