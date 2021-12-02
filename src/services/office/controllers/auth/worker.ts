import { Response, Request, NextFunction } from 'express';
import { Api } from 'interfaces';
import Resp from '../../Middlewares/res';
import { getConnection, getRepository } from 'typeorm';
import fm_worker from '../../../../db/models/fm_worker';
import Msg from '../../../../hooks/messages/index.ts';

export const worker = async (req: Request<any, Api.Resp>, res: Response, next: NextFunction): Promise<void> => {
	try {		
		const { id, type, email }: any = req.headers.token;

		if (type === 1) throw { message: 'no tiene permiso de consumir enta data' };
		const worker = await getRepository(fm_worker).findOne({
			where: { id, email },
			relations: ['roles', 'id_department'],
		});
		
		const { password, ...info }: any = worker;

		Resp(req, res, { message: 'data del usuario', info });
	} catch (err) {
		next(err);
	}
};

export const workerAll = async (req: Request<any, Api.Resp>, res: Response, next: NextFunction): Promise<void> => {
	try {
		const workers = await getRepository(fm_worker).find({ relations: ['roles'] });

		const info: any[] = workers.map((worker: any) => {
			const { password, ...data }: any = worker;

			return data;
		});

		Resp(req, res, { message: 'data del usuario', info });
	} catch (err) {
		next(err);
	}
};

export const getWorkerById = async (
	req: Request<Api.params, Api.Resp>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { id }: any = req.params;

		const worker = await getRepository(fm_worker).findOne({
			where: { id },
			relations: ['roles', 'id_department'],
		});
		const { password, ...data }: any = worker;

		const info = data;

		Resp(req, res, { message: 'data del usuario', info });
	} catch (err) {
		next(err);
	}
};

export const editWorkerById = async (
	req: Request<Api.params, Api.Resp, fm_worker>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { id } = req.params;
		const { roles, ...edit } = req.body;

		if (roles) {
			await getConnection().query(
				'DELETE FROM [MilPagos].[dbo].[fm_worker_roles_fm_roles] WHERE fmWorkerId =' + id
			);

			const queryIds = roles
				.map((rol) => {
					return /*sql*/ `INSERT INTO [dbo].[fm_worker_roles_fm_roles] ([fmWorkerId] ,[fmRolesId]) VALUES (${id} ,${rol.id})`;
				})
				.join(' ');

			await getConnection().query(queryIds);
		}

		await getRepository(fm_worker).update(id, edit);

		const message: string = Msg('trabajador').edit;

		Resp(req, res, { message });
	} catch (err) {
		next(err);
	}
};
