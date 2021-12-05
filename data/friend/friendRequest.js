const router = require('express').Router()
const db = require('../db')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

router.post('/request',(req, res) => {
    const username = req.body.username
    const authHeader = req.headers.authorization
    const token = authHeader.split(' ')[1]
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if(err){
            res
            .json({message: "Invalid Token!"})
        }else if(user.user == username){
            db.query(`SELECT SENDER AS USER FROM FRIENDREQUEST WHERE RECEIVER = '${username}'`,(err, results) => {
                if(err)
                    res.status(500)
                else{
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

router.post('/declineRequest', (req, res) => {
    const username = req.body.username
    const sender = req.body.sender
    const authHeader = req.headers.authorization
    const token = authHeader.split(' ')[1]
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if(err){
            res
            .json({message: "Invalid Token!"})
        }else if(user.user == username){
            db.query(`DELETE FROM FRIENDREQUEST WHERE SENDER = '${sender}' AND RECEIVER = '${username}'`,(err, results) => {
                if(err)
                    res.status(500)
                else{
                    console.log(results)
                    res
                    .status(200)
                    .json(results)
                }
            })
        }else{
            res
            .json({message: "Stolen Token"})
        }
    })

})
router.post('/acceptRequest', (req, res) => {
    const username = req.body.username
    const sender = req.body.sender
    const authHeader = req.headers.authorization
    const token = authHeader.split(' ')[1]
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if(err){
            res.json({message: "Invalid Token!"})
        }else if(user.user == username){
            db.query(`INSERT INTO FRIENDLIST VALUES('${username}','${sender}')`,(err, results) => {
                if(err){
                    res.status(500)
                    console.log(err)
                }else{
                    console.log(results)
                }
            })
            db.query(`DELETE FROM FRIENDREQUEST WHERE SENDER = '${sender}' AND RECEIVER = '${username}'`,(err, results) => {
                if(err)
                    res.status(500)
                else{
                    console.log(results)
                    res
                    .status(200)
                    .json(results)
                }
            })
        }else{
            res.json({message: "Stolen Token"})
        }
    })
})

module.exports = router