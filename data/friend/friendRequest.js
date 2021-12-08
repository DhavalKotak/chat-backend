const router = require('express').Router()
const db = require('../db')
const tokenVerify = require('../../api/auth/jwt')
const { v4: uuidv4 } = require('uuid')

router.post('/request',(req, res) => {
    let authHeader = req.headers.authorization
    let token = authHeader.split(' ')[1]
    const result = tokenVerify(token)
    if(result === false){
        res
        .json({message: "Invalid Token!"})
    }else{
        db.query(`SELECT SENDER AS USER FROM FRIENDREQUEST WHERE RECEIVER = '${result.user}'`,(err, results) => {
            if(err)
                res.status(500)
            else{
                console.log(results)
                res
                .status(200)
                .json({message: results})
            }
        })
    }
})

router.post('/sendRequest',(req, res) => {
    let username = req.body.user
    let authHeader = req.headers.authorization
    let token = authHeader.split(' ')[1]
    const result = tokenVerify(token)
    if(result === false){
        res
        .json({message: "Invalid Token!"})
    }else{
        db.query(`INSERT INTO FRIENDREQUEST VALUES ('${result.user}','${username}')`,(err, results) => {
            if(err)
                res.status(500)
            else{
                console.log(results)
                res
                .status(200)
                .json({message: results})
            }
        })
    }
})

router.post('/declineRequest', (req, res) => {
    let sender = req.body.sender
    let authHeader = req.headers.authorization
    let token = authHeader.split(' ')[1]
    const result = tokenVerify(token)
    if(result === false){
        res
        .json({message: "Invalid Token!"})
    }else{
        db.query(`DELETE FROM FRIENDREQUEST WHERE SENDER = '${sender}' AND RECEIVER = '${result.user}'`,(err, results) => {
            if(err)
                res.status(500)
            else{
                console.log(results)
                res
                .status(200)
                .json(results)
            }
        })
    }
})

router.post('/acceptRequest', (req, res) => {
    let sender = req.body.sender
    let authHeader = req.headers.authorization
    let token = authHeader.split(' ')[1]
    const result = tokenVerify(token)
    if(result === false){
        res.json({message: "Invalid Token!"})
    }else{
        db.query(`INSERT INTO FRIENDLIST VALUES('${result.user}','${sender}','${uuidv4()}')`,(err, results) => {
            if(err){
                res.status(500)
                console.log(err)
            }else{
                console.log(results)
            }
        })
        db.query(`DELETE FROM FRIENDREQUEST WHERE SENDER = '${sender}' AND RECEIVER = '${result.user}'`,(err, results) => {
            if(err)
                res.status(500)
            else{
                console.log(results)
                res
                .status(200)
                .json(results)
            }
        })
    }
})

module.exports = router