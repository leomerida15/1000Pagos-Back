import { NextFunction, Request, Response } from 'express';
import { Api } from 'interfaces';
import Resp from '../../Middlewares/res';
import Msg from '../../../../hooks/messages/index.ts';
import { Between, getRepository, Raw } from 'typeorm';
import fm_request from '../../../../db/models/fm_request';
import fm_status from '../../../../db/models/fm_status';
import fm_valid_request from '../../../../db/models/fm_valid_request';

export const editStatusByIdAdmision = async (
	req: Request<Api.params, Api.Resp, { id_status_request: number; valids?: fm_valid_request }>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const { id_FM }: any = req.params;
		const { id_status_request, valids } = req.body;

		const FM: any = await getRepository(fm_request).findOne(id_FM, { relations: ['id_valid_request'] });
		if (!FM) throw { message: 'FM no existe' };

		await getRepository(fm_status).update({ id_request: id_FM, id_department: 4 }, { id_status_request });

		if (id_status_request === 4) {
			const { id } = FM.id_valid_request;

			if (!valids) throw { message: 'cambio de estatus es 4, valids es requerido', code: 400 };

			await getRepository(fm_valid_request).update(id, { ...valids });
		}

		const message: string = Msg('Status del FM').edit;

		Resp(req, res, { message });
	} catch (err) {
		next(err);
	}
};

export const getStatusByIds = async (
	req: Request<Api.params, Api.Resp, fm_status>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const { initDate, endDate } = req.query;
		const where = { ...req.params, createdAt: Between(initDate, endDate) };

		const status = await getRepository(fm_status).find({
			where,
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
				'id_request.dir_pos.id_location.id_estado',
				'id_request.dir_pos.id_location.id_municipio',
				'id_request.dir_pos.id_location.id_ciudad',
				'id_request.dir_pos.id_location.id_parroquia',
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

		const info = status.map((status) => status.id_request);

		const message: string = Msg('Status del FM con los status ' + req.params).get;

		Resp(req, res, { message, info });
	} catch (err) {
		next(err);
	}
};
