import Log from 'hooks/logs';
import { getRepository } from 'typeorm';
import fm_department from '../models/fm_department';

const department = async (): Promise<void> => {
	const data: fm_department[] = [
		{
			name: 'aceptacion',
		},
		{
			name: 'adminitracion',
		},
		{
			name: 'activacion',
		},
	];

	//
	const valid = await getRepository(fm_department).find({ where: data });
	if (!valid.length) await getRepository(fm_department).save(data);
};

export default department;
