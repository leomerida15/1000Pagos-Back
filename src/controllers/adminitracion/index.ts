import { NextFunction, Request, Response } from 'express';
import { Api } from 'interfaces';
import Resp from '../../Middlewares/res/resp';
import fm_client from '../../db/models/fm_client';
import Msg from '../../hooks/messages/index.ts';
import { getConnection, getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import fm_phone from '../../db/models/fm_phone';
import { validationResult } from 'express-validator';
import fm_ident_type from '../../db/models/fm_ident_type';
import fm_commerce from '../../db/models/fm_commerce';
import fm_location from '../../db/models/fm_location';
import fm_bank from '../../db/models/fm_bank';
import fm_bank_commerce from '../../db/models/fm_bank_commerce';
import fm_department from '../../db/models/fm_department';
import fm_request from '../../db/models/fm_request';
import fm_status from '../../db/models/fm_status';
import fm_dir_pos from '../../db/models/fm_dir_pos';
import fm_request_origin from '../../db/models/fm_request_origin';
import { fm_valid_request } from '../../db/models/fm_valid_request';

// responder FM por id
export const getFmAdministration = async (
	req: Request<any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const query = await getRepository(fm_status).find({
			where: { id_status_request: 3, id_department: 1 },
			order: {
				id: 'ASC',
			},
			relations: [
				'id_request',
				'id_request.rc_comp_dep',
				'id_request.id_payment_method',
				'id_request.id_type_payment',
			],
		});

		if (!query) throw { message: 'no existen solicitudes en espera', code: 400 };
		// await getRepository(fm_request).update(FM.id, { id_status_request: 2 });

		const info = query;

		Resp(req, res, { message: 'FM respondida', info });
	} catch (err) {
		next(err);
	}
};

export const editStatusByIdAdministration = async (
	req: Request<Api.params, Api.Resp, { id_status_request: number; valids?: fm_valid_request }>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const { id_FM }: any = req.params;
		const { id_status_request } = req.body;

		const FM: any = await getRepository(fm_request).findOne(id_FM, { relations: ['id_valid_request'] });
		if (!FM) throw { message: 'FM no existe' };

		await getRepository(fm_status).update({id_request:id_FM, id_department:2}, { id_status_request });

		const message: string = Msg('Status del FM').edit;

		Resp(req, res, { message });
	} catch (err) {
		next(err);
	}
}
