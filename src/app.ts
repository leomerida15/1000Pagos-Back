// app's
import services from './services';
import { createConnection, getRepository } from 'typeorm';
import fm_request from './db/models/fm_request';
import fm_dir_pos from './db/models/fm_dir_pos';
// init server

createConnection()
	.then(async () => {
		const sv = services.find((service: any): boolean => {
			const keySer: string = service.key;

			if (!process.env.npm_lifecycle_event) return false;
			const key = process.env.npm_lifecycle_event.replace(/(serve:|start:)/i, '');

			return keySer === key;
		});

		const { app, key } = sv;

		app.listen(app.get('port'), () => {
			console.log(`${key} corriendo en el puerto http://localhost:${app.get('port')} leoM   `);
			console.log('_________');
			console.log('|       |');
			console.log('| ()_() |');
			console.log(`| (o.o) |`);
			console.log('| (|_|)*|');
			console.log('|_______|');
			console.log('| DB OK |');
			console.log('|_______|');
		});

		// let query: any = await getRepository(fm_request).findOne({
		// 	where: { id: 2 },
		// 	order: { id: 'ASC' },
		// 	relations: [
		// 		// client
		// 		'id_client',
		// 		'id_client.id_location',
		// 		'id_client.id_location.id_estado',
		// 		'id_client.id_location.id_municipio',
		// 		'id_client.id_location.id_ciudad',
		// 		'id_client.id_location.id_parroquia',
		// 		'id_client.id_ident_type',
		// 		// dir_pos
		// 		'dir_pos',
		// 		'dir_pos.id_location',
		// 		'dir_pos.id_location.id_estado',
		// 		'dir_pos.id_location.id_municipio',
		// 		'dir_pos.id_location.id_ciudad',
		// 		'dir_pos.id_location.id_parroquia',
		// 		// commerce
		// 		'id_commerce',
		// 		'id_commerce.id_ident_type',
		// 		'id_commerce.id_activity',
		// 		'id_commerce.id_location',
		// 		'id_commerce.id_location.id_estado',
		// 		'id_commerce.id_location.id_municipio',
		// 		'id_commerce.id_location.id_ciudad',
		// 		'id_commerce.id_location.id_parroquia',
		// 		'id_commerce.banks',
		// 		'id_commerce.id_aci',
		// 	],
		// });
		// if (query) {
		// 	const dir_pos = await getRepository(fm_dir_pos).find({
		// 		where: { id_request: query.id },
		// 		relations: [
		// 			'id_location',
		// 			'id_location.id_estado',
		// 			'id_location.id_municipio',
		// 			'id_location.id_ciudad',
		// 			'id_location.id_parroquia',
		// 		],
		// 	});
		// 	query.dir_pos = dir_pos;
		// 	console.log('dir_pos', query.dir_pos);
		// }
		// console.log('fmData', query);
	})
	.catch((err) => console.log('DB ERR', err));
