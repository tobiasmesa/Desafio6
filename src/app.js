import express from 'express';

import routerCarts from './routes/products.routes.js';
import routerProducts from './routes/carts.routes.js'

import { engine } from 'express-handlebars';
import routerViews from './routes/views.routes.js'

import { Server } from 'socket.io'
import { webSockets } from './utils/websockets.js';

import __dirname from './utils.js';



const PORT =  8080
const app = express()



app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const server = app.listen(PORT, () => {
    console.log(`🚀 Server started on port http://localhost:${PORT}`)
})

server.on('error', (err) => console.log(err))

app.use(express.static(__dirname+'/public'))


// - Endpoints Cart & Products
app.use("/api/products", routerProducts)
app.use("/api/carts", routerCarts)

// - Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views');
app.use('/', routerViews);

// - Sockets - Serverside

const socketServer = new Server(server)
webSockets(socketServer);


