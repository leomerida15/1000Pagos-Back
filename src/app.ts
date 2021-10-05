import https from 'https';
import fs from 'fs';
// app's
import app from './apps';
// init server

import { createConnection, getRepository } from 'typeorm';

//database

createConnection()
	.then(() => {
		// print process.argv
		app.listen(app.get('port'), () => {
			console.log(`app corriendo en el puerto http://localhost:${app.get('port')} leoM   `);
			console.log('_________');
			console.log('|       |');
			console.log('| ()_() |');
			console.log(`| (o.o) |`);
			console.log('| (|_|)*|');
			console.log('|_______|');
			console.log('| DB OK |');
			console.log('|_______|');
		});
	})
	.catch((err) => console.log('DB ERR', err));
