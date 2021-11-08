// Modules
import express, { Application, Request, Response } from 'express';
import { posRoutes, preRoutes } from './Middlewares';
import Routes from './router';

import path from 'path';

const app: any = express();

// middleware preRoutes
preRoutes(app);
app.use(express.json());

// Routes
Routes(app);

//
app.use('/static', express.static(path.resolve('static')));

// meddleware posRutes

posRoutes(app);

// Settings

app.set('port', process.env.PORT_FILES || 6060);

export default app;
