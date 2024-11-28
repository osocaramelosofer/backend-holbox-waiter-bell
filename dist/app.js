"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("./config/express");
const morgan_1 = __importDefault(require("morgan"));
const socket_io_1 = require("socket.io");
const node_http_1 = require("node:http");
require("dotenv/config");
const app = (0, express_2.createApp)();
const port = process.env.PORT || 3000;
console.log("===> ", process.env.FRONTEND_URL);
// Middleware to handle JSON
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
const server = (0, node_http_1.createServer)(app);
const allowedOrigins = [
    'https://waiter-bell-frontend.vercel.app',
    'http://localhost:3001',
    'http://localhost:3000',
    'https://waiter-bell-frontend-qnksjohfm-ferras-projects.vercel.app'
];
// Configurar el servidor de Socket.IO con CORS habilitado
const io = new socket_io_1.Server(server, {
    connectionStateRecovery: {},
    cors: {
        origin: allowedOrigins, // Reemplaza con el origen de tu cliente
        methods: ['GET', 'POST'],
        credentials: true
    }
});
io.on('connection', (socket) => {
    console.log('an user has connected!');
    console.log(process.env.FRONTEND_URL);
    socket.on('join table', (msg) => {
        console.log("escuchando emits para join table");
        // const tableData = JSON.parse(msg)
        // console.log("msg: ", tableData) // Esto debería mostrar el mensaje enviado desde el cliente
        io.emit('user arrived', msg);
        // socket.on('user arrived', (msg)=> {
        // })
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
app.get('/', (req, res) => {
    res.send("hello world setup pipeline :D second try?");
});
server.listen(port, () => {
    console.log(`Server running at port http://localhost:${port}`);
});
