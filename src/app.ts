// app's
import services from './services';
import { createConnection } from 'typeorm';
import contents from './db/contents';
import { Application } from 'express';
// init server

//database

createConnection()
	.then(async () => {
		await contents();

		const key: any = JSON.parse(`${process.env.npm_config_argv}`).original[0].replace('serve:', '');

		const app: Application = services.find((service: any) => service.key === key).app;

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
