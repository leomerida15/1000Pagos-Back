// app's
import services from './services';
import { createConnection, getConnection, getRepository } from 'typeorm';
import contents from './db/contents';
import { Application } from 'express';
import fm_status_request from './db/models/fm_status_request';
// init server


createConnection()
	.then(async () => {
		await contents();

		const app: Application = services.find((service: any): boolean => {
			const keySer: string = service.key;

			if (!process.env.npm_lifecycle_event) return false;
			const key = process.env.npm_lifecycle_event.replace(/(serve:|start:)/i, '');

			return keySer === key;
		}).app;

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
