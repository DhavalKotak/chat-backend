const db = require('../data/db')
const tokenVerify = require('../api/auth/jwt')

module.exports = {
    joinChat : (socket, token, user) => {
        const result = tokenVerify(token)
        let chat_id = ""
        if(result === false){
            return false
        }else{
            db.query(`SELECT CHAT_ID FROM FRIENDLIST WHERE USER = '${result.user}' AND FRIEND = '${user}' OR USER = '${user}' AND FRIEND = '${result.user}'`,(err, results) => {
                if(err)
                    throw err
                else{
                    chat_id = results[0].CHAT_ID
                    socket.join(chat_id)
                    socket.emit('getChatID', chat_id)
                }
                    
            })
        }
    },
    sendMessage : (socket, chat_id, message) => {
        socket.to(chat_id).emit('receiveMessage',message)
    }
}