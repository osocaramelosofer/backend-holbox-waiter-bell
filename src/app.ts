import express, { Request,Response} from 'express'
import { createApp } from './config/express';
import logger from 'morgan'
import {Server} from 'socket.io'
import {createServer} from 'node:http'
import 'dotenv/config'; 

const app = createApp();

const port = process.env.PORT || 3000;
console.log("===> ",process.env.FRONTEND_URL)

// Middleware to handle JSON
app.use(express.json())
app.use(logger('dev'))

const server = createServer(app)
const allowedOrigins = [
    'https://waiter-bell-frontend.vercel.app',
    'http://localhost:3001',
    'http://localhost:3000',
    'https://waiter-bell-frontend-qnksjohfm-ferras-projects.vercel.app'
  ]
// Configurar el servidor de Socket.IO con CORS habilitado
const io = new Server(server, {
    connectionStateRecovery: {},
    cors: {
      origin: allowedOrigins, // Reemplaza con el origen de tu cliente
      methods: ['GET', 'POST'],
      credentials: true
    }
})

io.on('connection', (socket) => {
    console.log('an user has connected!')
    console.log(process.env.FRONTEND_URL)

    socket.on('join table', (msg) => {
        console.log("escuchando emits para join table")
        // const tableData = JSON.parse(msg)
        // console.log("msg: ", tableData) // Esto debería mostrar el mensaje enviado desde el cliente

        io.emit('user arrived', msg)
        // socket.on('user arrived', (msg)=> {
        // })
    })
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

app.get('/', (req:Request, res:Response) => {
    res.send("hello world setup pipeline :D second try?")
})




server.listen(port, () => {
    console.log(`Server running at port http://localhost:${port}`)
})