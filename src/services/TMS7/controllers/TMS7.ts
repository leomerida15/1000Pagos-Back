import { NextFunction, Request, Response } from 'express';
import { Api } from '../../../interfaces';
import axios from 'axios';
let token: string = '';

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

		token = resp.data.access_token;

		res.status(200).json({ message: 'Auth OK', info: { id: 1 } });
	} catch (err) {
		next(err);
	}
};

export const getAllCommerce = async (
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

		token = resp.data.access_token;

		res.status(200).json({ message: 'Auth OK', info: { id: 1 } });
	} catch (err) {
		next(err);
	}
};
