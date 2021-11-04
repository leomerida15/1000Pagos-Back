import { NextFunction, Request, Response } from 'express';
import { Api } from '../../../../interfaces';
import { getRepository, In } from 'typeorm';
import Msg from '../../../../hooks/messages/index.ts';
import Resp from '../../Middlewares/res';
import fm_request from '../../../../db/models/fm_request';
import fm_status from '../../../../db/models/fm_status';

// responder FM por id
export const getFmAdministration = async (
	req: Request<any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const query = await getRepository(fm_status).find({
			where: { id_department: 1, id_status_request: 3 },
			relations: ['id_request'],
		});

		if (!query.length) throw { message: 'no existen solicitudes en espera', code: 400 };

		const ids: any[] = query.map((item: any) => item.id_request.id);

		const query2 = await getRepository(fm_status).find({
			where: { id_request: In(ids), id_department: 2, id_status_request: 1 },
			relations: [
				'id_request',
				'id_request.id_commerce',
				'id_request.id_client',
				'id_request.rc_comp_dep',
				'id_request.id_payment_method',
				'id_request.id_type_payment',
			],
		});

		const info = query2;

		if (!query2.length) throw { message: 'no existen solicitudes en espera', code: 400 };

		Resp(req, res, { message: 'FM respondida', info });
	} catch (err) {
		next(err);
	}
};

export const editStatusByIdAdministration = async (
	req: Request<
		Api.params,
		Api.Resp,
		{ id_status_request: number; id_payment_method: number; id_type_payment: number }
	>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const { id_FM }: any = req.params;
		const { id_status_request, id_payment_method, id_type_payment } = req.body;

		const FM: any = await getRepository(fm_request).findOne(id_FM, { relations: ['id_valid_request'] });
		if (!FM) throw { message: 'FM no existe' };

		await getRepository(fm_status).update({ id_request: id_FM, id_department: 2 }, { id_status_request });

		if (id_payment_method && id_type_payment)
			await getRepository(fm_request).update({ id: id_FM }, { id_payment_method, id_type_payment });

		const message: string = Msg('Status del FM').edit;

		Resp(req, res, { message });
	} catch (err) {
		next(err);
	}
};
