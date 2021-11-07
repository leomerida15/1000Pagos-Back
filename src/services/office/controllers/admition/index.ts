import { NextFunction, Request, Response } from 'express';
import { Api } from 'interfaces';
import Resp from '../../Middlewares/res/';
import Msg from '../../../../hooks/messages/index.ts';
import { getRepository } from 'typeorm';
import fm_status from '../../../../db/models/fm_status';

// responder FM por id
export const getAllDiferidosByAdmition = async (
	req: Request<any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const status = await getRepository(fm_status).find({
			where: { id_status_request: 1, id_department: 4 },
			order: { id: 'ASC' },
			relations: [
				'id_request',
				'id_request.id_client',
				'id_request.id_client.id_location',
				'id_request.id_client.id_location.id_estado',
				'id_request.id_client.id_location.id_municipio',
				'id_request.id_client.id_location.id_ciudad',
				'id_request.id_client.id_location.id_parroquia',
				'id_request.id_client.id_ident_type',
				'id_request.id_valid_request',
				'id_request.dir_pos',
				'id_request.dir_pos.id_location',
				'id_request.rc_constitutive_act',
				'id_request.rc_special_contributor',
				'id_request.rc_ref_bank',
				'id_request.rc_comp_dep',
				'id_request.rc_rif',
				'id_request.rc_ident_card',
				'id_request.id_payment_method',
				'id_request.id_type_payment',
				'id_request.id_commerce',
				'id_request.id_commerce.id_ident_type',
				'id_request.id_commerce.id_activity',
				'id_request.id_commerce.id_location',
				'id_request.id_commerce.banks',
				'id_request.id_product',
				'id_request.id_type_request',
				'id_request.id_request_origin',
			],
		});

		if (!status) throw { message: 'no existen solicitudes en espera', code: 400 };

		const info = status.map((fm) => fm.id_request);

		Resp(req, res, { message: Msg('diferido').getAll, info });
	} catch (err) {
		next(err);
	}
};
