import { NextFunction, Request, Response } from 'express';
import { Api } from '../../../interfaces';
import axios from 'axios';
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
		next(err);
	}
};

export const getAllCommerce = async (
	req: Request<any, Api.Resp, any>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		console.log('req.headers.token', req.headers.token);

		const { id }: any = req.headers.token;

		console.log('users', users);

		const usar = users.find((user) => user.id === id);
		if (!usar) throw { message: 'usuario no logeado', code: 401 };

		console.log('usar', usar);

		const resp = await axios.post('http://10.198.72.86/TMS7API/v1/Merchant?net_id=0002', {
			headers: {
				Authorization: 'Bearer ' + usar.access_token,
			},
		});

		res.status(200).json({ message: 'Auth OK', info: resp.data });
	} catch (err) {
		console.log(err);
	}
};
