import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import fm_ident_type from '../../../../db/models/fm_ident_type';
import Resp from '../../Middlewares/res/resp';
import Msg from '../../../../hooks/messages/index.ts';
import { Api } from 'interfaces';
import fm_activity from '../../../../db/models/fm_activity';
import fm_status_request from '../../../../db/models/fm_status_request';
import fm_product from '../../../../db/models/fm_product';

export const getAllIdent_type = async (
	req: Request<any, any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const info = await getRepository(fm_ident_type).find();

		const message: string = Msg('identidad').getAll;

		Resp(req, res, { message, info });
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

export const getAllProcusts = async (
	req: Request<any, any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const info = await getRepository(fm_product).find();

		const message: string = Msg('Productos').getAll;

		Resp(req, res, { message, info });
	} catch (err) {
		next(err);
	}
};
