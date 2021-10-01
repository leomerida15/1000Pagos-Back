import Log from 'hooks/logs';
import { getRepository } from 'typeorm';
import fm_client from '../models/fm_client';

const client = async (): Promise<void> => {
	const data: fm_client[] = [
		{
			name: 'test',
			last_name: 'test',
			password: '$2b$10$4fYNDPFNI8TzB/scddXfV.hsgXtPfi8jFAp7MOujpeSfB0TbtO6fe', //Test123.
			id_ident_type: 1,
			ident_num: '12345678',
			email: 'leomerida15@gmail.com',
		},
	];

	//
	const valid = await getRepository(fm_client).find({ where: data });
	if (!valid.length) await getRepository(fm_client).save(data);
};

export default client;
