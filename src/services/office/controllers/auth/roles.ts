import { Response, Request, NextFunction } from 'express';
import { Api } from 'interfaces';
import Resp from '../../Middlewares/res';
import { getConnection, getRepository } from 'typeorm';
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
		const { roles, ...editar } = req.body;

		if (!roles) throw { message: 'no envio roles para comparar ni editar', code: 400 };

		await getConnection().query('DELETE FROM [MilPagos].[dbo].[fm_worker_roles_fm_roles] WHERE fmWorkerId =' + id);

		const queryIds = roles
			.map((rol) => {
				return /*sql*/ `INSERT INTO [dbo].[fm_worker_roles_fm_roles] ([fmWorkerId] ,[fmRolesId]) VALUES (${id} ,${rol.id})`;
			})
			.join(' ');

		await getConnection().query(queryIds);

		await getRepository(fm_worker).update(id, editar);

		const message: string = Msg('trabajador').edit;

		Resp(req, res, { message });
	} catch (err) {
		next(err);
	}
};
