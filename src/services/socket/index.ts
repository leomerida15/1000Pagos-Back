// Modules
import express, { Application } from 'express';
import { posRoutes, preRoutes } from './Middlewares';
import Routes from './router';
import http from 'http';
import { Server } from 'socket.io';

const app: Application = express();
const server = http.createServer(app);
const io = new Server(server);

// middleware preRoutes
preRoutes(app);

app.use(express.json());

// Routes
Routes(app);

// meddleware posRutes
posRoutes(app);

io.on('connection', (socket: any): void => {
	console.log('a user connected');
});

// Settings
app.set('port', process.env.PORT_SOCKET || 6061);

export default app;
