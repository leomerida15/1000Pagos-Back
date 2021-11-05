import { getRepository } from 'typeorm';
import  fm_type_payment  from '../models/fm_type_payment';

const type_payment = async (): Promise<void> => {
	const data: fm_type_payment[] = [
		{
			name: 'De contado',
		},
		{
			name: 'Inicial',
		},
	];
	//
	const valid = await getRepository(fm_type_payment).find({ where: data });
	if (!valid.length) await getRepository(fm_type_payment).save(data);
};

export default type_payment;
