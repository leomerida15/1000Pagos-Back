import { NextFunction, Request, Response } from 'express';
import { Api } from 'interfaces';
import Resp from '../../Middlewares/res';
import fm_client from '../../../../db/models/fm_client';
import Msg from '../../../../hooks/messages/index.ts';
import { getConnection, getRepository, Not } from 'typeorm';
import bcrypt from 'bcrypt';
import fm_phone from '../../../../db/models/fm_phone';
import { validationResult } from 'express-validator';
import fm_ident_type from '../../../../db/models/fm_ident_type';
import fm_commerce from '../../../../db/models/fm_commerce';
import fm_location from '../../../../db/models/fm_location';
import fm_bank from '../../../../db/models/fm_bank';
import fm_bank_commerce from '../../../../db/models/fm_bank_commerce';
import fm_department from '../../../../db/models/fm_department';
import fm_request from '../../../../db/models/fm_request';
import fm_status from '../../../../db/models/fm_status';
import fm_dir_pos from '../../../../db/models/fm_dir_pos';
import fm_request_origin from '../../../../db/models/fm_request_origin';
import fm_valid_request from '../../../../db/models/fm_valid_request';
import fm_quotas_calculated from '../../../../db/models/fm_quotas_calculated';
import fm_product from '../../../../db/models/fm_product';
import fm_commerce_constitutive_act from '../../../../db/models/fm_commerce_constitutive_act';
import axios from 'axios';
const { HOST, PORT_PROVIDERS } = process.env;

const urlApi: string = 'http://10.198.68.21'; //aldrin
//const urlApi: string = 'http://10.198.73.15'; //qa
const portApi: string = '8000';

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
export const fm_create_client = async (
	req: Request<any, Api.Resp, fm_client>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		validationResult(req).throw();

		const { phone1, phone2, email, id_ident_type, ident_num, location }: any = req.body;

		let client = await getRepository(fm_client).findOne({
			select: ['id'],
			where: { email, id_ident_type, ident_num },
		});

		let message: string = ``;

		if (!client) {
			req.body.rc_ident_card = null;
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

			// console.log('req.body', req.body);

			client = await getRepository(fm_client).save({
				...req.body,
				ref_person_1: JSON.stringify(req.body.ref_person_1),
				ref_person_2: JSON.stringify(req.body.ref_person_2),
			});

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

		let resp: Api.Resp = { message: ``, info: { matsh: false } };

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

		const client = await getRepository(fm_client).findOne({
			where: { email },
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

		if (client && client.ident_num != ident_num && client.id_ident_type != id_ident_type) {
			throw { message: 'el correo ya esta asociado a otro documento de identidad' };
			//
		} else if (client) {
			resp = {
				message: 'el usuario existe',
				info: {
					client,
					matsh: true,
					matshImg: (await getRepository(fm_request).findOne({ id_client: client.id })) ? true : false,
				},
			};
			//
		} else if (!resp.message.length) {
			resp.message = `ni el correo ni la ci existen`;
			//
		}

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
			const valid_commerce_client = await getRepository(fm_commerce).count({ id_ident_type, ident_num });
			if (valid_commerce_client) {
				throw { message: 'este comercio ya se encuentra asociado a un cliente', code: 400 };
			} else {
				resp = { message: 'el commercio no exite' };
			}
		} else {
			const matchImg: boolean = (await getRepository(fm_request).count({ id_client })) ? true : false;
			resp = { message: 'datos del comercio', info: { ...commerce, matchImg, matsh: true } };
		}

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
		const { id_ident_type, ident_num, special_contributor, location, name, id_activity, days } = req.body;
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
				days,
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

		const bank: any = await getRepository(fm_bank).findOne({
			select: ['name', 'id'],
			where: { code: bank_account_num.slice(0, 4) },
		});
		if (!bank) throw { message: 'el banco no existe' };

		let valid_bank_commerce: any;
		const client: any = await getRepository(fm_client).findOne({ email });

		const obj = { bank_account_num, id_bank: bank.id };

		if (!client) {
			valid_bank_commerce = await getRepository(fm_bank_commerce).findOne(obj);

			if (valid_bank_commerce) throw { message: 'El numero de cuenta esta asociado a otro cliente' };
		} else {
			valid_bank_commerce = await getRepository(fm_bank_commerce).count({
				id_client: Not(client.id),
				bank_account_num,
				id_bank: bank.id,
			});

			if (valid_bank_commerce) throw { message: 'El numero de cuenta esta asociado a otro cliente' };
		}
		Resp(req, res, { message: 'OK', info: { ...bank } });
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
		// validacion de data
		validationResult(req).throw();

		const {
			number_post,
			rc_constitutive_act,
			rc_special_contributor,
			rc_ref_bank,
			rc_comp_dep,
			rc_rif,
			rc_ident_card,
			id_payment_method,
			id_client,
			id_commerce,
			dir_pos,
			bank_account_num,
			id_request_origin,
			id_type_payment, //tipo de pago
			ci_referred,
			id_product,
			discount,
			nro_comp_dep,
			pagadero,
		}: any = req.body;

		await getRepository(fm_client).update(id_client, { rc_ident_card });

		await getRepository(fm_commerce).update(id_commerce, { rc_special_contributor, rc_rif });

		const constitutive_act = rc_constitutive_act.map((id_photo: any) => ({ id_commerce, id_photo }));
		await getRepository(fm_commerce_constitutive_act).save(constitutive_act);

		const product = await getRepository(fm_product).findOne(id_product);
		if (!product) throw { message: 'el producto no existe suministrado' };

		const bank: any = await getRepository(fm_bank).findOne({ code: bank_account_num.slice(0, 4) });
		if (!bank) throw { message: 'el banco no existe' };

		const valid_bank_commerce = await getRepository(fm_bank_commerce).count({
			id_client: Not(id_client),
			bank_account_num,
		});

		if (valid_bank_commerce) throw { message: 'El numero de cuenta esta asociado a otro cliente' };
		else {
			await getRepository(fm_bank_commerce).save({ bank_account_num, id_commerce, id_bank: bank.id, id_client });
		}

		const valids = await getRepository(fm_valid_request).save({
			valid_constitutive_act: '',
			valid_special_contributor: '',
			valid_ref_bank: '',
			valid_comp_dep: '',
			valid_rif: '',
			valid_ident_card: '',
		});

		const initial = ((): number => {
			if (id_type_payment === 2) {
				const { initial }: any = req.body;
				return initial;
			} else {
				return product.price * number_post;
			}
		})();

		const quotas_total = ((): number => {
			if (id_type_payment === 2) {
				const monto = product.price * number_post;
				return (monto - 50) / product.quota;
			} else {
				return 1;
			}
		})();

		const quotas_to_pay = ((): number => {
			if (id_type_payment === 2) {
				const monto = product.price * number_post;
				const { initial }: any = req.body;

				return (monto - (discount ? 50 : 0) - initial) / product.quota;
			} else {
				return 0;
			}
		})();

		const quotas = await getRepository(fm_quotas_calculated).save({
			id_type_payment,
			initial,
			quotas_total,
			quotas_to_pay,
		});

		const FM_save = await getRepository(fm_request).save({
			number_post,
			bank_account_num,
			rc_comp_dep,
			rc_rif,
			rc_ref_bank,
			id_payment_method,
			id_client,
			id_commerce,
			id_type_request: 1,
			id_request_origin,
			id_type_payment,
			ci_referred,
			id_valid_request: valids.id,
			id_product,
			discount,
			nro_comp_dep,
			pagadero,
			id_quotas_calculat: quotas.id,
		});

		await getRepository(fm_quotas_calculated).update({ id: quotas.id }, { id_request: FM_save.id });

		const validlocation = await getRepository(fm_location).findOne(dir_pos);
		const location = validlocation ? validlocation : await getRepository(fm_location).save(dir_pos);
		const id_request = FM_save.id;

		await getRepository(fm_dir_pos).save({ id_location: location.id, id_commerce, id_request, id_product });

		await getRepository(fm_request).update(
			{ id: FM_save.id },
			{ code: 'S' + id_client + id_commerce + 'F' + FM_save.id }
		);

		const statusFm: any = [
			4, //Admision
			5, //Cobranza
			6, //Activacion
			7, //Administracion
		];

		const status = statusFm.map((dep: number) => {
			const id_request = FM_save.id;
			const id_department = dep;
			const id_status_request = 1;
			//
			return { id_request, id_department, id_status_request };
		});

		const statusData = getRepository(fm_status).create(status);
		await getRepository(fm_status).save(statusData);

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
		const query = await getRepository(fm_status).findOne({
			where: { id_status_request: 1, id_department: 4 },
			order: {
				id: 'ASC',
			},
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
				'id_request.id_commerce.id_location.id_estado',
				'id_request.id_commerce.id_location.id_municipio',
				'id_request.id_commerce.id_location.id_ciudad',
				'id_request.id_commerce.id_location.id_parroquia',
				'id_request.id_commerce.banks',
				'id_request.id_product',
				'id_request.id_type_request',
				'id_request.id_request_origin',
			],
		});

		if (!query) throw { message: 'no existen solicitudes en espera', code: 400 };

		const info = query.id_request;

		Resp(req, res, { message: 'FM respondida', info });
	} catch (err) {
		next(err);
	}
};

export const editStatusByIdAdmision = async (
	req: Request<Api.params, Api.Resp, { id_status_request: number; valids?: fm_valid_request; id_aci: any }>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const { id_FM }: any = req.params;
		const { id_status_request, valids, id_aci } = req.body;

		const FM: any = await getRepository(fm_request).findOne(id_FM, {
			relations: ['id_valid_request', 'id_product'],
		});
		if (!FM) throw { message: 'FM no existe' };

		await getRepository(fm_status).update({ id_request: id_FM, id_department: 4 }, { id_status_request });

		if (id_status_request === 4) {
			const { id } = FM.id_valid_request;

			if (!valids) throw { message: 'cambio de estatus es 4, valids es requerido', code: 400 };

			await getRepository(fm_valid_request).update(id, { ...valids });
		}

		const edit = await getRepository(fm_commerce).update(FM.id_commerce, { id_aci });

		if (id_status_request === 3) {
			const { pagadero, id_product } = FM;

			if (pagadero) {
				if (id_product.id === 1) {
					await axios.post(
						`${HOST}:${PORT_PROVIDERS}/auth/login`,
						{
							grant_type: 'password',
							username: 'acesso.teste',
							password: '@ger7123',
						},
						{ headers: { token: req.headers.token_text } }
					);

					await axios.post(
						`${HOST}:${PORT_PROVIDERS}/tms7/commerce`,
						{ id_fm: FM.id, id_commerce: FM.id_commerce, id_client: FM.id_client },
						{ headers: { token: req.headers.token_text } }
					);

					await axios.post(
						`${HOST}:${PORT_PROVIDERS}/app1000pagos/commerce`,
						{ id_fm: FM.id, id_commerce: FM.id_commerce, id_client: FM.id_client },
						{ headers: { token: req.headers.token_text } }
					);
				} else if (id_product.id === 2) {
					//
					await axios.post(
						`${HOST}:${PORT_PROVIDERS}/app1000pagos/commerce`,
						{ id_fm: FM.id, id_commerce: FM.id_commerce, id_client: FM.id_client },
						{ headers: { token: req.headers.token_text } }
					);
				}
			}
		}

		const message: string = Msg('Status del FM').edit;

		Resp(req, res, { message });
	} catch (err) {
		next(err);
	}
};
