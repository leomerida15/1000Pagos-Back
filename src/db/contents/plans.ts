import fm_plans from '../models/fm_plans';
import { getRepository } from 'typeorm';

const plans = async () => {
	const data: fm_plans[] = [
		{
			name: 'par-I a 4 cuotas',
			total: 350,
			quota: 50,
			discount: 50,
			id_product: 1,
		},
		{ name: 'par-I de contado', total: 350, quota: 350, discount: 50, id_product: 1 },
		{
			name: 'DIAL-UP a 4 cuotas',
			total: 350,
			quota: 50,
			discount: 50,
			id_product: 2,
		},
		{ name: 'DIAL-UP de contado', total: 350, quota: 350, discount: 50, id_product: 2 },
	];

	const valid = await getRepository(fm_plans).find();
	if (!valid.length) await getRepository(fm_plans).save(data);
};

export default plans;
