import { Response, Request, NextFunction } from 'express';
import { Api } from 'interfaces';
import Resp from '../../Middlewares/res';
import { getRepository } from 'typeorm';
import fm_roles from '../../../../db/models/fm_roles';
import fm_worker from '../../../../db/models/fm_worker';
import Msg from '../../../../hooks/messages/index.ts';

export const getAllRoles = async (
	req: Request<any, Api.Resp>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const info = await getRepository(fm_roles).find();

		Resp(req, res, { message: 'data del usuario', info });
	} catch (err) {
		next(err);
	}
};

export const editRolByWorker = async (
	req: Request<Api.params, Api.Resp, fm_worker>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { id } = req.params;
		const info = await getRepository(fm_worker).update(id, req.body);

		const message: string = Msg('trabajador').edit;

		Resp(req, res, { message, info });
	} catch (err) {
		next(err);
	}
};
