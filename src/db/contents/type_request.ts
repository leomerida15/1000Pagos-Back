import { getRepository } from 'typeorm';
import fm_type_request from '../models/fm_type_request';

const type_request = async (): Promise<void> => {
	const data: fm_type_request[] = [
		{
			name: 'test',
		},
	];

	//
	const valid = await getRepository(fm_type_request).find({ where: data });
	if (!valid.length) await getRepository(fm_type_request).save(data);
};

export default type_request;
