import e, { NextFunction, Request, Response } from 'express';
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
import fm_request from '../../db/models/fm_request';
import fm_dir_pos from '../../db/models/fm_dir_pos';
import { refresh } from '../../apps/WebSocket';

// crear al cliente
export const fm_valid_client = async (
	req: Request<any, Api.Resp, fm_client>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		validationResult(req).throw();

		const { phone1, phone2, email, id_ident_type, ident_num, location }: any = req.body;

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

			const reslocation = await getRepository(fm_location).save(location);
			req.body.id_location = reslocation.id;

			client = await getRepository(fm_client).save(req.body);

			// definimos data de telefonos
			const id_client: any = client.id;
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

// validar que el cliente existe
export const valid_existin_client = async (
	req: Request<any, Api.Resp, fm_client>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		validationResult(req).throw();

		const { email, id_ident_type, ident_num } = req.body;

		let resp: Api.Resp = { message: ``, info: { mash: false } };

		// validar existencia de la clave cumpuesta
		const validIdent = await getRepository(fm_client).findOne({ id_ident_type, ident_num });
		if (validIdent && validIdent.email != email) {
			throw { message: 'el documento de identidad ya esta afiliado a un correo' };
		}

		const validIdentType: any = await getRepository(fm_client)
			.createQueryBuilder('fm_clinet')
			.leftJoinAndSelect('fm_clinet.id_ident_type', 'id_ident_type')
			.where(`fm_clinet.ident_num = ${ident_num}`)
			.getOne();

		if (validIdentType && validIdentType.id_ident_type.id != id_ident_type) {
			throw { message: 'el de docuemnto de identidad no coinside' };
		}

		const validMail = await getRepository(fm_client).findOne({ email });
		if (validMail && validMail.ident_num != ident_num && validMail.id_ident_type != id_ident_type) {
			throw { message: 'el correo ya esta asociado a otro documento de identidad' };
		}

		const client = await getRepository(fm_client).findOne({ id_ident_type, ident_num, email });
		if (client) resp = { message: 'el usuario existe', info: { id: client.id, mash: true } };
		else if (!resp.message.length) resp.message = `ni el correo ni la ci existen`;

		Resp(req, res, resp);
	} catch (err) {
		next(err);
	}
};

interface commerce extends fm_commerce {
	location: fm_location;
}
// crear comercio
export const fm_create_commerce = async (
	req: Request<Api.params, Api.Resp, commerce>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		validationResult(req).throw();

		const id_client: any = req.params.id;
		const { id_ident_type, ident_num, special_contributor, location, name, id_activity } = req.body;
		let commerce: any = await getRepository(fm_commerce).findOne({ id_ident_type, ident_num, id_client });

		let Resps: Api.Resp = { message: '', info: {} };

		if (!commerce) {
			const commerce_doc = await getRepository(fm_commerce).findOne({ id_ident_type, ident_num });
			if (commerce_doc) throw { message: 'el rif del comercio esta asociado a otro cliente' };

			const reslocation = await getRepository(fm_location).save(location);
			const id_location = reslocation.id;

			commerce = await getConnection()
				.createQueryBuilder()
				.insert()
				.into(fm_commerce)
				.values({
					name,
					id_ident_type,
					ident_num,
					special_contributor,
					id_activity,
					id_location,
					id_client,
				})
				.execute();

			Resps = {
				message: Msg('commercio', commerce.identifiers[0].id).create,
				info: { id_commerce: commerce.identifiers[0].id },
			};
		} else {
			Resps = { message: Msg('commercio', commerce.id).get, info: { id_commerce: commerce.id } };
		}

		Resp(req, res, Resps);
	} catch (err) {
		next(err);
	}
};

export const valid_bank_account = async (
	req: Request<any, Api.Resp>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		validationResult(req).throw();

		const { bank_account_num, email }: any = req.body;

		const bank: any = await getRepository(fm_bank).findOne({ code: bank_account_num.slice(0, 4) });
		if (!bank) throw { message: 'el banco no existe' };

		let valid_bank_commerce: any;
		const client: any = await getRepository(fm_client).findOne({ email });

		const obj = {
			bank_account_num,
			id_bank: bank.id,
		};

		if (!client) {
			valid_bank_commerce = await getRepository(fm_bank_commerce).findOne(obj);
			if (valid_bank_commerce) throw { message: 'El numero de cuenta esta asociado a otro cliente' };
		} else {
			valid_bank_commerce = await getConnection()
				.createQueryBuilder()
				.from(fm_bank_commerce, 'fm_bank_commerce')
				.where('fm_bank_commerce.id_client NOT IN (:ids)', { ...obj, ids: [client.id] })
				.getMany();

			if (valid_bank_commerce.length) throw { message: 'El numero de cuenta esta asociado a otro cliente' };
		}
		Resp(req, res, { message: 'OK' });
	} catch (err) {
		next(err);
	}
};

// crear FM
export const FM_create = async (
	req: Request<any, Api.Resp, fm_request>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		validationResult(req).throw();

		const {
			number_post,
			bank_account_num,
			rc_constitutive_act,
			rc_property_document,
			rc_service_document,
			rc_special_contributor,
			rc_ref_bank,
			rc_ref_perso,
			rc_account_number,
			rc_rif,
			rc_ident_card,
			id_payment_method,
			id_client,
			id_commerce,
			dir_pos,
		}: any = req.body;

		const bank: any = await getRepository(fm_bank).findOne({ code: bank_account_num.slice(0, 4) });
		if (!bank) throw { message: 'el banco no existe' };

		const obj = {
			bank_account_num,
			id_bank: bank.id,
			ids: [id_client],
		};

		const valid_bank_commerce = await getConnection()
			.createQueryBuilder()
			.from(fm_bank_commerce, 'fm_bank_commerce')
			.where('fm_bank_commerce.id_client NOT IN (:ids)', obj)
			.getMany();

		if (valid_bank_commerce.length) throw { message: 'El numero de cuenta esta asociado a otro cliente' };
		else {
			await getRepository(fm_bank_commerce).save({
				bank_account_num,
				id_commerce,
				id_bank: bank.id,
			});
		}

		const FM = await getRepository(fm_request).save({
			number_post,
			bank_account_num,
			rc_constitutive_act,
			rc_property_document,
			rc_service_document,
			rc_special_contributor,
			rc_ref_bank,
			rc_ref_perso,
			rc_account_number,
			rc_rif,
			rc_ident_card,
			id_payment_method,
			id_client,
			id_commerce,
			id_type_request: 1,
			id_status_request: 1,
		});

		const FM_save = await getRepository(fm_request).save(FM);

		const validlocation = await getRepository(fm_location).findOne(dir_pos);
		const location = validlocation ? validlocation : await getRepository(fm_location).save(dir_pos);

		await getRepository(fm_dir_pos).save({ id_location: location.id, id_commerce, id_request: FM_save.id });

		res.status(200).json({ message: 'FM creada', info: { id: FM_save.id } });
	} catch (err) {
		next(err);
	}
};

// responder FM por id
export const getFm = async (
	req: Request<any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const FM: any = await getConnection().query(/*sql*/ `
		SELECT 
 			a.id AS id_fm 
 			,a.number_post
 			,p.name AS paymet
 			,a.bank_account_num
 			,c.id AS id_client
 			,c.name AS name_client
 			,c.last_name AS last_name_client
 			,c.email AS email_client
 			,i.name AS ident_type_client
 			,c.ident_num AS ident_num_client
 			,cc.name AS name_commerce
 			,ic.name AS ident_type_commerce
 			,cc.ident_num AS ident_num_commerce
 			,cc.special_contributor
 			,es.estado AS estado_commerce
 			,mu.municipio AS municipio_commerce
 			,ci.ciudad AS ciudad_commerce
 			,pa.parroquia AS parroquia_commerce
 			,l.sector AS sector_commerce
 			,l.calle AS calle_commerce
 			,l.local AS local_commerce
 			,esp.estado AS estado_pos
 			,mup.municipio AS municipio_pos
 			,cip.ciudad AS ciudad_pos
 			,pap.parroquia AS parroquia_pos
 			,lp.sector AS sector_pos
 			,lp.calle AS calle_pos
 			,lp.local AS local_pos
 			,p1.path AS path_rc_ident_card
 			,p2.path AS path_rc_rif
 			,p3.path AS path_rc_constitutive_act
 			,p4.path AS path_rc_property_document
 			,p5.path AS path_rc_service_document
 			,p6.path AS path_rc_ref_bank
 			,p7.path AS path_rc_ref_perso
 			,p8.path AS path_rc_account_number
 			,p9.path AS path_rc_special_contributor
		
		FROM 
			(SELECT * FROM fm_request 
 			WHERE id_status_request = 1
 			ORDER by id ASC 
 			LIMIT 1) AS a

			INNER JOIN fm_client AS c ON id_client = c.id
			INNER JOIN fm_commerce AS cc ON id_commerce = cc.id
			INNER JOIN fm_ident_type AS i ON c.id_ident_type = i.id 
			INNER JOIN fm_ident_type AS ic ON cc.id_ident_type = ic.id
			INNER JOIN fm_location AS l ON cc.id_location = l.id
			INNER JOIN fm_estado as es ON l.id_estado = es.id
			INNER JOIN fm_municipio as mu ON l.id_municipio = mu.id
			INNER JOIN fm_ciudad as ci ON l.id_ciudad = ci.id
			INNER JOIN fm_parroquia as pa ON l.id_parroquia = pa.id
			INNER JOIN fm_payment_method as p ON id_payment_method = p.id
			LEFT JOIN fm_photo AS p1 ON rc_ident_card = p1.id
			LEFT JOIN fm_photo AS p2 ON rc_rif = p2.id
			LEFT JOIN fm_photo AS p3 ON rc_constitutive_act = p3.id
			LEFT JOIN fm_photo AS p4 ON rc_property_document = p4.id
			LEFT JOIN fm_photo AS p5 ON rc_service_document = p5.id
			LEFT JOIN fm_photo AS p6 ON rc_ref_bank = p6.id
			LEFT JOIN fm_photo AS p7 ON rc_ref_perso = p7.id
			LEFT JOIN fm_photo AS p8 ON rc_account_number = p8.id
			LEFT JOIN fm_photo AS p9 ON rc_special_contributor = p9.id
			INNER JOIN fm_dir_pos AS dp ON a.id = dp.id_request 
			INNER JOIN fm_location AS lp ON dp.id_location = lp.id
			INNER JOIN fm_estado as esp ON lp.id_estado = esp.id
			INNER JOIN fm_municipio as mup ON lp.id_municipio = mup.id
			INNER JOIN fm_ciudad as cip ON lp.id_ciudad = cip.id
			INNER JOIN fm_parroquia as pap ON lp.id_parroquia = pap.id`);

		if (!FM.length) throw { message: 'No existen formularios de solicitud en espera de aprobacion' };

		const phones = await getRepository(fm_phone).find({ id_client: FM[0].id_client });

		const info = { ...FM[0], phone1: phones[0].phone, phone2: phones[1].phone };

		// await getRepository(fm_request).update(FM.id, { id_status_request: 2 });

		Resp(req, res, { message: 'FM respondida', info });
	} catch (err) {
		next(err);
	}
};

export const editStatusById = async (
	req: Request<Api.params, Api.Resp, { id_status_request: number; valids?: any }>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const { id_FM }: any = req.params;
		const { id_status_request, valids } = req.body;

		const FM: any = await getRepository(fm_request).findOne(id_FM);
		if (!FM) throw { message: 'FM no existe' };

		await getRepository(fm_request).update(id_FM, { id_status_request });

		if (id_status_request === 4) {
			await getRepository(fm_request).update(id_FM, { id_status_request, ...valids });
			await refresh();
		}

		const message: string = Msg('Status del FM').edit;

		Resp(req, res, { message });
	} catch (err) {
		next(err);
	}
};
