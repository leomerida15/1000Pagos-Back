import { Request, Response, NextFunction } from 'express';
import { Api } from 'interfaces';
import fm_commerce from '../../db/models/fm_commerce';
import fm_client from '../../db/models/fm_client';

import { getRepository } from 'typeorm';

export const createCommerce = async (
	req: Request<Api.params, Api.resp, fm_commerce>,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const { id, email }: any = req.headers.token;
		// const { id_aci } = req.body;

		const validClient = await getRepository(fm_client).findOne({ id, email });
		if (validClient) throw { message: 'cliente no existente', code: 400 };

		req.body.id_client = id;

		await getRepository(fm_commerce).save(req.body);

		res.status(200).json({ message: 'comercio creado' });
	} catch (err) {
		next(err);
	}
};
