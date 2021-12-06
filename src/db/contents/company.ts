import { getRepository } from 'typeorm';
import fm_company from '../models/fm_company';

const company = async (): Promise<void> => {
	const data: fm_company[] = [
		{
			name: 'Tranred',
		},
		{
			name: '1000pagos',
		},
		{
			name: 'DigoPago',
		},
	];

	//
	const valid = await getRepository(fm_company).find({ where: data });
	if (!valid.length) await getRepository(fm_company).save(data);
};

export default company;
