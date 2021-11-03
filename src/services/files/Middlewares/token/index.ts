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

		// use
		if (result) {
			if (req.headers.token) {
				const { token }: any = req.headers;
				const resp: any = jwt.verify(token, Key);

				console.log(resp);

				req.headers.token = resp;

				next();
				//
			} else throw { status: false, message: 'JWT es requerido', code: 400 };
		} else {
			next();
		}
	} catch (err: any) {
		err.code = 403;
		next(err);
	}
};
