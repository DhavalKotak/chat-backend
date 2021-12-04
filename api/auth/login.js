const router = require("express").Router();
const db = require('../../data/db')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

router.post('/login', async (req, res) => {
    const {username, password} = req.body
    db.query(`SELECT * FROM USERS WHERE USERNAME = '${username}' and PASSWORD = '${password}'`,(err, results) => {
        if(err){
            res.status(500)
            console.log(err)
        }else if(results.length === 1){
            let token = jwt.sign({user: username}, JWT_SECRET)
            console.log(token)
            console.log(`${username} logged in`)
            res
            .status(200)
            .json({message: token})
        }else{
            res
            .status(401)
            .json({message: "Incorrect username or password!"})
        }
    })
})

module.exports = router