// Modules
import express, { Application, Request, Response } from 'express';
import { posRoutes, preRoutes } from './Middlewares';
import Routes from './router';

const app: any = express();

// middleware preRoutes
preRoutes(app);

app.use(express.json());

// Routes
Routes(app);

// meddleware posRutes
posRoutes(app);

// Settings

app.set('port', process.env.PORT_OFFICE || 5051);

export default app;
