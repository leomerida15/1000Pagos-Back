import { getRepository } from 'typeorm';
import fm_product from '../models/fm_product';

const product = async (): Promise<void> => {
	const data: fm_product[] = [
		{
			name: 'WP PAR-I',
			price: 350,
			description: 'El mejor equipo',
		},
		{
			name: 'DIAL-UP',
			price: 450,
			description: 'El mejor equipo',
		},
	];
	//
	const valid = await getRepository(fm_product).find({ where: data });
	if (!valid.length) await getRepository(fm_product).save(data);
};

export default product;
