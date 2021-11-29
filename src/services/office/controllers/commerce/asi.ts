import { NextFunction, Request, Response } from 'express';
import Msg from '../../../../hooks/messages/index.ts';
import { Api } from '../../../../interfaces';
import { getRepository } from 'typeorm';
import Aliados from '../../../../db/models/Aliados';
import Resp from '../../Middlewares/res';

export const getAllAliados = async (
	req: Request<any, any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const info = await getRepository(Aliados).find({ order: { id: 'DESC' } });

		const message: string = Msg('Aliado').getAll;

		// Resp(req, res, { message, info });
		res.status(200).json({ message, info });
	} catch (err) {
		next(err);
	}
};
