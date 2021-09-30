import { getRepository } from 'typeorm';
import fm_product from '../models/fm_product';

const product = async (): Promise<void> => {
	const data: fm_product[] = [
		{
			name: 'WP PAR-1',
			price: 350,
			description: 'El mejor equipo',
		},
		{
			name: 'WP PAR-2',
			price: 450,
			description: 'El mejor equipo',
		},
	];
	//
	const valid = await getRepository(fm_product).find({ where: data });
	if (!valid.length) await getRepository(fm_product).save(data);
};

export default product;
