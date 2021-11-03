import { Response, Request, NextFunction } from 'express';
import { Api } from 'interfaces';
import Resp from '../../Middlewares/res';
import { getRepository } from 'typeorm';
import fm_roles from '../../../../db/models/fm_roles';

export const rolesAll = async (req: Request<any, Api.Resp>, res: Response, next: NextFunction): Promise<void> => {
	try {
		const info = await getRepository(fm_roles).find();

		Resp(req, res, { message: 'data del usuario', info });
	} catch (err) {
		next(err);
	}
};
