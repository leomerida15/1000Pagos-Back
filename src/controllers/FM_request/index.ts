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
import fm_request_origin from '../../db/models/fm_request_origin';
import { fm_valid_request } from '../../db/models/fm_valid_request';

//
export const requestOrigin = async (
	req: Request<any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const info = await getRepository(fm_request_origin).find();

		Resp(req, res, { message: 'Origenes de la solicitud', info });
	} catch (err) {
		next(err);
	}
};

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

		const client = await getRepository(fm_client).findOne({
			where: { id_ident_type, ident_num, email },
			relations: [
				'phones',
				'id_ident_type',
				'id_location',
				'id_location.id_estado',
				'id_location.id_municipio',
				'id_location.id_ciudad',
				'id_location.id_parroquia',
			],
		});
		if (client) {
			resp = { message: 'el usuario existe', info: { client, matsh: true } };
			resp.info.matshImg = (await getRepository(fm_request).findOne({ id_client: client.id })) ? true : false;
		} else if (!resp.message.length) resp.message = `ni el correo ni la ci existen`;

		Resp(req, res, resp);
	} catch (err) {
		next(err);
	}
};

interface commerce extends fm_commerce {
	location: fm_location;
}
// crear comercio
export const valid_exitin_commerce = async (
	req: Request<Api.params, Api.Resp, commerce>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		validationResult(req).throw();

		let resp: Api.Resp;

		const id_client: any = req.params.id;
		const { id_ident_type, ident_num } = req.body;
		const commerce = await getRepository(fm_commerce).findOne({
			where: { id_ident_type, ident_num, id_client },
			relations: [
				'id_ident_type',
				'id_activity',
				'id_location',
				'id_location.id_estado',
				'id_location.id_municipio',
				'id_location.id_ciudad',
				'id_location.id_parroquia',
				'banks',
			],
		});

		if (!commerce) {
			const valid_commerce_client = await getRepository(fm_commerce).findOne({ id_ident_type, ident_num });
			if (valid_commerce_client) {
				throw { message: 'este comercio ya se encuentra asociado a un cliente', code: 400 };
			} else {
				resp = { message: 'el commercio no exite' };
			}
		} else {
			resp = { message: 'datos del comercio', info: commerce };
		}

		resp.info.matchImg = (await getRepository(fm_request).findOne({ id_client })) ? true : false;

		Resp(req, res, resp);
	} catch (err) {
		next(err);
	}
};

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

			commerce = await getRepository(fm_commerce).save({
				name,
				id_ident_type,
				ident_num,
				special_contributor,
				id_activity,
				id_location,
				id_client,
			});

			Resps = {
				message: Msg('commercio', commerce.id).create,
				info: { id_commerce: commerce.id },
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
			bank_account_num,
			id_request_origin,
			id_type_payment,
			ci_referred,
			id_product,
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

		const valids = await getRepository(fm_valid_request).save({
			valid_constitutive_act: '',
			valid_special_contributor: '',
			valid_ref_bank: '',
			valid_comp_dep: '',
			valid_rif: '',
			valid_ident_card: '',
		});

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
			id_request_origin,
			id_type_payment,
			ci_referred,
			id_valid_request: valids.id,
			id_product,
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
		const info = await getRepository(fm_request).findOne({
			where: { id_status_request: 1 },
			order: {
				id: 'ASC',
			},
			relations: [
				'id_client',
				'id_client.id_location',
				'id_client.id_location.id_estado',
				'id_client.id_location.id_municipio',
				'id_client.id_location.id_ciudad',
				'id_client.id_location.id_parroquia',
				'id_client.id_ident_type',
				'id_valid_request',
				'dir_pos',
				'dir_pos.id_location',
				'rc_constitutive_act',
				'rc_special_contributor',
				'rc_ref_bank',
				'rc_comp_dep',
				'rc_rif',
				'rc_ident_card',
				'id_payment_method',
				'id_type_payment',
				'id_commerce',
				'id_commerce.id_ident_type',
				'id_commerce.id_activity',
				'id_commerce.id_location',
				'id_commerce.banks',
				'id_product',
				'id_type_request',
				'id_status_request',
				'id_request_origin',
			],
		});
		if (!info) throw { message: 'no existen solicitudes en espera', code: 400 };
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
		}

		const message: string = Msg('Status del FM').edit;

		Resp(req, res, { message });
	} catch (err) {
		next(err);
	}
};
