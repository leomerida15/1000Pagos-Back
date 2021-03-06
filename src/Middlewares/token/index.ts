// modules
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import list from './list';
const Key: string = process.env.KEY || '_secreto';

/** this middleware is for convert json web token in Objet format */
export default (req: Request, res: Response, next: NextFunction) => {
	try {
		// define array route

		// valid use
		const result: boolean =
			list.includes(req.baseUrl) || list.includes(req.path.split('/')[1]) || list.includes(req.path.split('/')[2]);

		console.clear();
		console.log('result', result);

		// use
		if (result) {
			if (req.headers.token) {
				// console.log('header', req.headers.token);

				const { token }: any = req.headers;
				const resp: any = jwt.verify(token, Key);

				console.log(resp);

				req.headers.token = resp;

				console.log('header', req.headers.token);

				next();
				//
			} else throw { status: false, message: 'the JWT in require', code: 400 };
		} else {
			next();
		}
	} catch (err) {
		next(err);
	}
};
