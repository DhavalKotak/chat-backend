const router = require('express').Router()
const db = require('../../data/db')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

router.post('/register', (req, res) => {
    const {username, password, email} = req.body
        db.query(`INSERT INTO USERS(username, password, email) VALUES('${username}', '${password}','${email}')`,err => {     
            if(err){
                res
                .status(200)
                .json({message: "Username already exist!"})
                console.log("mysql err in insert"+err)
            }else{
                let token = jwt.sign({user: username}, JWT_SECRET)
                res
                .status(200)
                .json({message: token})
                console.log(`${username} Registered`)
            }
        })
})

module.exports = router