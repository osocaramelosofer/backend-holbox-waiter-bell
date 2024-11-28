// src/config/express.ts
import express from 'express';
import cors from 'cors';

export const createApp = () => {
  const app = express();

  // Configurar trust proxy
  app.set('trust proxy', 1);

  // Middleware para parsear cuerpos en JSON y URL encoded
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const allowedOrigins = [
    'https://waiter-bell-frontend.vercel.app',
    'http://localhost:3000'
  ]
  // Configurar CORS
  app.use(cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
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
