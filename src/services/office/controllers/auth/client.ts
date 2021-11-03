import { NextFunction, Request, Response } from 'express';
import { Api } from 'interfaces';
import Resp from '../../Middlewares/res';
import fm_client from '../../../../db/models/fm_client';
import Msg from '../../../../hooks/messages/index.ts';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import fm_phone from '../../../../db/models/fm_phone';
import { validationResult } from 'express-validator';
import fm_ident_type from '../../../../db/models/fm_ident_type';

export const valid_client = async (
	req: Request<any, Api.Resp, fm_client>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		validationResult(req).throw();

		const { phone1, phone2, email, id_ident_type, ident_num }: any = req.body;

		let client = await getRepository(fm_client).findOne({ email, id_ident_type, ident_num });

		let message: string = ``;

		if (!client) {
			// validar existencia de la clave cumpuesta
			const validIdent = await getRepository(fm_client).findOne({ id_ident_type, ident_num });
			if (validIdent) throw { message: 'el documento de identidad ya esta afiliado a un correo' };

			// validar existencia de la clave cumpuesta
			const validMail = await getRepository(fm_client).findOne({ email });
			if (validMail) throw { message: 'el correo ya esta asociado a otro documento de identidad' };

			const type = await getRepository(fm_ident_type).findByIds([id_ident_type]);
			// encript password
			const salt: string = await bcrypt.genSalt(10);
			req.body.password = await bcrypt.hash(type[0].name + ident_num + '.', salt);

			client = await getRepository(fm_client).save(req.body);
			const resp = await getRepository(fm_client).save(req.body);

			// definimos data de telefonos
			const id_client: any = resp.id;
			const phones: fm_phone[] = [phone1, phone2].map((phone: string): fm_phone => ({ phone, id_client }));

			// guardamos los telefonos
			await getRepository(fm_phone).save(phones);

			message = Msg('client', client.id).create;
		} else message = Msg('client', client.id).get;

		Resp(req, res, { message, info: { id: client.id } });
	} catch (err) {
		next(err);
	}
};
