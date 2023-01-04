import productManager from "../services/products.services.js"

export const webSockets = (socketServer) => {
    socketServer.on('connection', (socket) => {
        console.log(`⚡️ new client connection - socket.id = ${socket.id}`)
        productManager.getProducts().then((products) => {
            socketServer.emit("sendProducts", products);
        })
    })
   
}


