import fm_roles from '../models/fm_roles';
import { getRepository } from 'typeorm';
import fm_status_request from '../models/fm_status_request';

const status_request = async (): Promise<void> => {
	const data: fm_status_request[] = [
		{
			name: 'En espera de Admición',
		},
		{
			name: 'En proceso Admición',
		},
		{
			name: 'aprobado por Admición',
		},
		{
			name: 'diferido por Admición',
		},
	];
	//
	const valid = await getRepository(fm_status_request).find({ where: data });
	if (!valid.length) await getRepository(fm_status_request).save(data);
};

export default status_request;
