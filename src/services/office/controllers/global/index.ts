import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import fm_ident_type from '../../../../db/models/fm_ident_type';
import Resp from '../../Middlewares/res';
import Msg from '../../../../hooks/messages/index.ts';
import { Api } from 'interfaces';
import fm_activity from '../../../../db/models/fm_activity';
import fm_status_request from '../../../../db/models/fm_status_request';
import fm_company from '../../../../db/models/fm_company';
import fm_department from '../../../../db/models/fm_department';

export const getAllIdent_type = async (
	req: Request<any, any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const info = await getRepository(fm_ident_type).find();

		const message: string = Msg('identidad').getAll;

		res.status(200).json({ message, info });
	} catch (err) {
		next(err);
	}
};

export const getAllActivity = async (
	req: Request<any, any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const info = await getRepository(fm_activity).find({ relations: ['id_afiliado'] });

		const message: string = Msg('Actividade').getAll;

		Resp(req, res, { message, info });
	} catch (err) {
		next(err);
	}
};

export const getAllStatus = async (
	req: Request<any, any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const info = await getRepository(fm_status_request).find();

		const message: string = Msg('Status').getAll;

		Resp(req, res, { message, info });
	} catch (err) {
		next(err);
	}
};

export const getAllCompanys = async (
	req: Request<any, any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const info = await getRepository(fm_company).find();

		const message: string = Msg('compañia').getAll;

		res.status(200).json({ message, info });
	} catch (err) {
		next(err);
	}
};

export const getAllDeparments = async (
	req: Request<any, any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const info = await getRepository(fm_department).find();

		const message: string = Msg('departamento').getAll;

		Resp(req, res, { message, info });
	} catch (err) {
		next(err);
	}
};
