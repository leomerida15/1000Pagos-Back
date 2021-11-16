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

app.set('port', process.env.PORT_TMS7 || 8000);

app.listen(app.get('port'), () => {
	console.log(`TMS7 corriendo en el puerto http://localhost:${app.get('port')} leoM   `);
	console.log('_________');
	console.log('|       |');
	console.log('| ()_() |');
	console.log(`| (o.o) |`);
	console.log('| (|_|)*|');
	console.log('|_______|');
	console.log('| DB OK |');
	console.log('|_______|');
});
