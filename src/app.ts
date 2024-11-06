import express, { Request,Response} from 'express'
import { createApp } from './config/express';
import logger from 'morgan'
import {Server} from 'socket.io'
import {createServer} from 'node:http'

const app = createApp();

const port = process.env.PORT || 3000;

// Middleware to handle JSON
app.use(express.json())
app.use(logger('dev'))

const server = createServer(app)

// Configurar el servidor de Socket.IO con CORS habilitado
const io = new Server(server, {
    connectionStateRecovery: {},
    cors: {
      origin: 'http://localhost:3001', // Reemplaza con el origen de tu cliente
      methods: ['GET', 'POST']
    }
})

io.on('connection', (socket) => {
    console.log('an user has connected!')

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