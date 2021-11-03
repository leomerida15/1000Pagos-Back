// modules
import { Request, Response } from 'express';
// scripts
import descript from './code';

export default (req: Request, res: Response) => {
	// create obj of the Response
	const code_descript = descript[404];
	const message = 'Sorry the route no is valid  404';
	const obj = { status: false, message, code: 404, code_descript, path: req.originalUrl, method: req.method };

	// to write Response in the consol
	if (obj.message.length + obj.code_descript.length + obj.path.length < 80) console.table([obj]);
	else console.log(obj);

	// Response
	res.status(404).json(obj);
};
