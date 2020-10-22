let io;

module.exports = {
    init : httpServer => {
        io = require('socket.io')(httpServer);
        return io;
    },
    getIO : () => {
        if(!io){
            throw Error("Socket is not initialized")
        }else{
            return io;
        }
    }
}