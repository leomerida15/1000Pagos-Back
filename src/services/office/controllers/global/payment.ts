import { NextFunction, Request, Response } from 'express';
import Resp from '../../Middlewares/res';
import { getRepository } from 'typeorm';
import fm_payment_method from '../../../../db/models/fm_payment_method';
import { Api } from 'interfaces';
import fm_type_payment from '../../../../db/models/fm_type_payment';

export const paymentAll = async (
	req: Request<any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const info = await getRepository(fm_payment_method).find();

		Resp(req, res, { message: 'Metodos de pago', info });
	} catch (err) {
		next(err);
	}
};

export const typePayment = async (
	req: Request<any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const info = await getRepository(fm_type_payment).find();

		Resp(req, res, { message: 'tipos de pago', info });
	} catch (err) {
		next(err);
	}
};
