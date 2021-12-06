import { NextFunction, Request, Response } from 'express';
import { Api } from '../../../interfaces';
import axios from 'axios';
import { getRepository } from 'typeorm';
import fm_commerce from '../../../db/models/fm_commerce';
import fm_request from '../../../db/models/fm_request';
import ident_type from '../../../db/contents/ident_type';
import fm_status from '../../../db/models/fm_status';
let token: string = '';

let users: any[] = [];

// const axios = Axios.create({
// 	baseURL: 'http://10.198.72.86',
// 	timeout: 1000,
// 	headers: {
// 		Authorization: `Bearer ${token}`,
// 		'Content-Type': 'application/x-www-form-urlencoded',
// 	},
// });

interface tms7Auth {
	grant_type?: 'password';
	username: string;
	password: string;
}

interface tms7Commerce {}

export const Login = async (
	req: Request<any, Api.Resp, tms7Auth>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		console.log('body', req.body);

		const bodyTMS7 = new URLSearchParams();

		const { body }: any = req;

		req.body.grant_type = 'password';

		Object.keys(req.body).forEach((key: any) => bodyTMS7.append(key, body[key]));

		const resp = await axios.post('http://10.198.72.86/auth/token', bodyTMS7, {
			headers: {
				Connection: 'keep-alive',
				'Accept-Encoding': 'gzip, deflate, br',
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		});

		const { token }: any = req.headers;
		const { access_token } = resp.data;

		const i = users.findIndex((user) => user.id === token.id);

		if (i >= 0) users[i].access_token = resp.data.access_token;
		else users.push({ id: token.id, access_token });

		res.status(200).json({ message: 'Auth OK' });
	} catch (err) {
		console.log('err', err);

		next(err);
	}
};

export const getAllCommerce = async (
	req: Request<any, Api.Resp, any>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { id }: any = req.headers.token;

		const usar = users.find((user) => user.id === id);
		// if (!usar) throw { message: 'usuario no logeado', code: 401 };

		const resp = await axios.get('http://10.198.72.86/TMS7API/v1/Merchant?net_id=0002', {
			headers: {
				Authorization: 'Bearer ' + usar.access_token,
			},
		});

		res.status(200).json({ message: 'Auth OK', info: resp.data });
	} catch (err) {
		next(err);
	}
};

const validarRif_tms7 = async (rif: string, access_token: string): Promise<boolean> => {
	try {
		await axios.get(`http://10.198.72.86/TMS7API/v1/Merchant?net_id=2&taxId=${rif}`, {
			headers: {
				Authorization: 'Bearer ' + access_token,
			},
		});
		return true;
	} catch (err) {
		let error: any = err;

		console.log(error);

		return false;
	}
};

const createCommerceTMS7 = async (commerce: any, access_token: string): Promise<boolean> => {
	try {
		await axios.post('http://10.198.72.86/TMS7API/v1/Merchant', commerce, {
			headers: {
				Authorization: 'Bearer ' + access_token,
			},
		});
		return true;
	} catch (err) {
		let error: any = err;
		return false;
	}
};

export const createCommerce = async (
	req: Request<Api.params, Api.Resp, { id_fm: number; id_commerce: number; id_client: number }>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { token }: any = req.headers;

		const usar = users.find((user) => user.id === token.id);
		if (!usar) throw { message: 'usuario no logeado', code: 401 };

		const fmData = await getRepository(fm_request).findOne({
			where: { id: req.body.id_fm, id_commerce: req.body.id_commerce, id_client: req.body.id_client },
			order: { id: 'ASC' },
			relations: [
				// client
				'id_client',
				'id_client.id_location',
				'id_client.id_location.id_estado',
				'id_client.id_location.id_municipio',
				'id_client.id_location.id_ciudad',
				'id_client.id_location.id_parroquia',
				'id_client.id_ident_type',
				// dir_pos
				'dir_pos',
				'dir_pos.id_location',
				'dir_pos.id_location.id_estado',
				'dir_pos.id_location.id_municipio',
				'dir_pos.id_location.id_ciudad',
				'dir_pos.id_location.id_parroquia',
				// commerce
				'id_commerce',
				'id_commerce.id_ident_type',
				'id_commerce.id_activity',
				'id_commerce.id_activity.id_afiliado',
				'id_commerce.id_location',
				'id_commerce.id_location.id_estado',
				'id_commerce.id_location.id_municipio',
				'id_commerce.id_location.id_ciudad',
				'id_commerce.id_location.id_parroquia',
			],
		});
		if (!fmData) throw { message: 'el commercio suministrado no existe', code: 400 };		

		const { id_commerce, id_client, dir_pos, id }: any = fmData;
		const { name, id_ident_type, ident_num, id_activity }: any = id_commerce;
		const { id_estado, id_ciudad } = id_commerce.id_location;

		const address = Object.keys(id_commerce.id_location)
			.filter((key) => key !== 'id')
			.map((key) => id_commerce.id_location[key][key.replace('id_', '')])
			.filter((item) => item)
			.join(', ');

		const address_line1 = Object.keys(id_client.id_location)
			.filter((key) => key !== 'id')
			.map((key) => id_client.id_location[key][key.replace('id_', '')])
			.filter((item) => item)[0];

		const address_line2 = Object.keys(dir_pos[0].id_location)
			.map((key) => 
				dir_pos[0].id_location[key][key.replace('id_', '')]
			)
			.filter((item) => item)[0];

		const merchantId = `7${id_activity.id_afiliado.id}${11000 + (id + 777)}`;

		const commerce = {
			net_id: 2,
			subacquirer_code: `0${id_activity.id_afiliado.id}`,
			merchantId,
			company_name: name,
			receipt_name: name,
			trade_name: name,
			taxId: `${id_ident_type.name}${ident_num}`,
			address,
			address_number: 100,
			address_line1,
			address_line2,
			city: id_client.name,
			state: id_estado.estado,
			postalcode: id_ciudad.postal_code,
			group: { name: `${id_activity.id_afiliado.name}`, installments: '1' },
			partner: null,
		};		

		// const commerce = {
		// 	net_id: 2,
		// 	subacquirer_code: `7${id_activity.id_afiliado.id}`,
		// 	merchantId: merchantId,
		// 	company_name: name,
		// 	receipt_name: name,
		// 	trade_name: name,
		// 	taxId: `${id_ident_type.name}${ident_num}`,
		// 	address,
		// 	address_number: 100,
		// 	address_line1,
		// 	address_line2,
		// 	city: 'caracas',
		// 	state: id_estado.estado,
		// 	postalcode: id_ciudad.postal_code,
		// 	group: { name: `${id_activity.id_afiliado.name}`, installments: '1' },
		// 	partner: null,
		// };

		await createCommerceTMS7(commerce, usar.access_token);		

		res.status(200).json({ message: 'comercio creado', info: commerce });
	} catch (err) {
		next(err);
	}
};
