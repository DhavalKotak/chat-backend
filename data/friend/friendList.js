const router = require("express").Router();
const db = require('../db')
const tokenVerify = require('../../api/auth/jwt')

router.post('/list',(req, res) => {
    let authHeader = req.headers.authorization
    let token = authHeader.split(' ')[1]
    const result = tokenVerify(token)
    if(result === false){
        res
        .json({message: "Invalid Token!"})
    }else{
        db.query(`SELECT USER FROM FRIENDLIST WHERE FRIEND = '${result.user}' UNION SELECT FRIEND FROM FRIENDLIST WHERE USER = '${result.user}'`,(error, results) => {
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
    }
})

module.exports = router