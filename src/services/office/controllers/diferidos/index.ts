import { getConnection, getRepository } from 'typeorm';
import fm_request from '../../../../db/models/fm_request';

export const getAllDiferidos = async (): Promise<void> => {
	const request = await getConnection()
		.createQueryBuilder()
		.from(fm_request, 'fm_request')
		.where('fm_request.id NOT IN (:ids)', { ids: [] })
		.getMany();
};
