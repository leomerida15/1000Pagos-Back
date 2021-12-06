import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Api } from 'interfaces';
const Key: string = process.env.KEY || '_secreto';

const Resp = (req: Request<any, Api.Resp>, res: Response<Api.Resp>, msg: Api.Resp<any>) => {
	// msg.token = msg.token ? jwt.sign(token, Key, { expiresIn: 60 * 30 }) : msg.token;

	msg.token = (() => {
		if (!msg.token) {
			const { id, type, email }: any = req.headers.token;

			return jwt.sign({ id, type, email }, Key, { expiresIn: '1h' });
		} else {
			return msg.token;
		}
	})();

	res.status(200).json(msg);
};

export default Resp;
