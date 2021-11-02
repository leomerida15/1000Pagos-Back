// Modules
import express, { Application } from 'express';
import { posRoutes, preRoutes } from './Middlewares';
import Routes from './router';
import http from 'http';
import socket from './router/web/index';

const app: Application = express();
const WsServer = http.createServer(app);

// middleware preRoutes
preRoutes(app);

app.use(express.json());

// Routes
Routes(app);

// meddleware posRutes
posRoutes(app);

// se levanta el servidor de sockets
socket(WsServer);

// Settings
app.set('port', process.env.PORT_SOCKET || 6061);

export default app;
