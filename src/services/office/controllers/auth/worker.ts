import { Response, Request, NextFunction } from 'express';
import { Api } from 'interfaces';
import Resp from '../../Middlewares/res';
import { getRepository } from 'typeorm';
import fm_worker from '../../../../db/models/fm_worker';

export const worker = async (req: Request<any, Api.Resp>, res: Response, next: NextFunction): Promise<void> => {
	try {
		const { id, type }: any = req.headers.token;

		if (type === 1) throw { message: 'no esta tiene permiso de consumir enta data' };
		const worker = await getRepository(fm_worker).findOne({ where: { id }, relations: ['roles'] });

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

		const worker = await getRepository(fm_worker).findOne({ where: { id }, relations: ['roles'] });
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
		const { id }: any = req.params;
		const { roles } = req.body;

		const worker = await getRepository(fm_worker).update(id, { roles });
		const { password, ...data }: any = worker;

		const info = data;

		Resp(req, res, { message: 'data del usuario', info });
	} catch (err) {
		next(err);
	}
};
