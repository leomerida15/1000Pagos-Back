// modules
import { Request, Response, NextFunction } from 'express';
// scripts
import codes, { errCodes } from './code';

export default (err: any, req: Request, res: Response, next: NextFunction) => {
	if (!err) next();
	// define vars
	const descripts: any = codes;
	const code: number =
		err.code && typeof err.code != 'string' ? err.code : err.response ? err.response.status : 500;

	const message = ((): string => {
		if (err.response) return err.response.message;
		else if (err.errors) return err.errors.map((err: any) => err.msg).join(', ');
		else if (err.message) return err.message;
		else return err;
	})();
	const code_descript: string = descripts[code] ? descripts[code] : `${code}`;

	// create obj for response
	const obj = { status: false, message, code, code_descript, path: req.originalUrl, method: req.method };

	// to write response in the consol
	const length = obj.message.length + obj.code_descript.length + obj.path.length;
	if (length < 80) console.table([obj]);
	else console.log(obj);

	// response
	res.status(code).json(obj);
};
