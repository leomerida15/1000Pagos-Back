import { getRepository } from 'typeorm';
import fm_status_request from '../models/fm_status_request';

const status_request = async (): Promise<void> => {
	const data: fm_status_request[] = [
		{
			id: 1,
			name: 'En espera',
		},
		{
			id: 2,
			name: 'En proceso',
		},
		{
			id: 3,
			name: 'aprobado',
		},
		{
			id: 4,
			name: 'diferido',
		},
	];
	//
	const valid = await getRepository(fm_status_request).find({ where: data });
	if (!valid.length) await getRepository(fm_status_request).save(data);
};

export default status_request;
