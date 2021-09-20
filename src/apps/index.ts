// Modules
import express, { Application, Request, Response } from 'express';
import { posRoutes, preRoutes } from '../Middlewares';
import Routes from '../router';

import { createConnection, getRepository } from 'typeorm';
import log from '../hooks/logs/index';
import path from 'path';

//database

createConnection()
	.then(async () => {
		// await contents();
		log.text.OK('DB OK');
	})
	.catch((err) => console.log('DB ERR', err));

const app: Application = express();

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

app.set('port', process.env.PORT || 4040);

export default app;
