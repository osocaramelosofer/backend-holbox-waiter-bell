"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
// src/config/express.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const createApp = () => {
    const app = (0, express_1.default)();
    // Configurar trust proxy
    app.set('trust proxy', 1);
    // Middleware para parsear cuerpos en JSON y URL encoded
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    const allowedOrigins = [
        'https://waiter-bell-frontend.vercel.app',
        'http://localhost:3000'
    ];
    // Configurar CORS
    app.use((0, cors_1.default)({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            }
            else {
                callback(new Error('Origen no permitido por CORS'));
            }
        },
        allowedHeaders: [
            'Origin',
            'X-Requested-With',
            'Content-Type',
            'Accept',
            'X-Access-Token',
        ],
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
    }));
    return app;
};
exports.createApp = createApp;
