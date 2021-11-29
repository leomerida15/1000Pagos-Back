import { getRepository } from 'typeorm';
import fm_worker from '../models/fm_worker';

const worker = async (): Promise<void> => {
	const data: fm_worker[] = [
		{
			name: 'Armando',
			last_name: 'test',
			password: '$2b$10$4fYNDPFNI8TzB/scddXfV.hsgXtPfi8jFAp7MOujpeSfB0TbtO6fe', //Test123.
			id_ident_type: 1,
			ident_num: '12345677',
			email: 'armando@example.com',
			phone: '+584444848',
			id_company: 1,
			id_department: 8,
		},
		{
			name: 'Jesus',
			last_name: 'test',
			password: '$2b$10$4fYNDPFNI8TzB/scddXfV.hsgXtPfi8jFAp7MOujpeSfB0TbtO6fe', //Test123.
			id_ident_type: 1,
			ident_num: '12345678',
			email: 'work@correo.com',
			phone: '+584444848',
			id_company: 1,
			id_department: 8,
		},
		{
			name: 'Aldrin',
			last_name: 'test',
			password: '$2b$10$4fYNDPFNI8TzB/scddXfV.hsgXtPfi8jFAp7MOujpeSfB0TbtO6fe', //Test123.
			id_ident_type: 1,
			ident_num: '12345679',
			email: 'aetour.ca@gmail.com',
			phone: '+584444848',
			id_company: 1,
			id_department: 8,
		},
		{
			name: 'Dimas',
			last_name: 'test',
			password: '$2b$10$4fYNDPFNI8TzB/scddXfV.hsgXtPfi8jFAp7MOujpeSfB0TbtO6fe', //Test123.
			id_ident_type: 1,
			ident_num: '12345670',
			email: 'leomerida15@gmail.com',
			phone: '+584444848',
			id_company: 1,
			id_department: 8,
		},
	];

	//
	const valid = await getRepository(fm_worker).find();
	if (!valid.length) await getRepository(fm_worker).save(data);
};

export default worker;
