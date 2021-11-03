import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Resp from '../../Middlewares/res';
import Msg from '../../../../hooks/messages/index.ts';
import { Api } from 'interfaces';
import fm_product from '../../../../db/models/fm_product';

export const getAllProcusts = async (
	req: Request<any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const info = await getRepository(fm_product).find({ relations: ['photos'] });

		const message: string = Msg('Productos').getAll;

		Resp(req, res, { message, info });
	} catch (err) {
		next(err);
	}
};

export const createProducts = async (
	req: Request<any, Api.Resp, fm_product>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		await getRepository(fm_product).save(req.body);

		const message: string = Msg('Producto').create;

		Resp(req, res, { message });
	} catch (err) {
		next(err);
	}
};
