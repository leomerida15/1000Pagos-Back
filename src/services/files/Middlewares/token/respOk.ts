import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Api } from 'interfaces';
const Key: string = process.env.KEY || '_secreto';

const respOk = (req: Request<any, Api.resp>, res: Response<Api.resp>, msg: Api.resp<any>) => {
	const { token }: any = req.headers;
	msg.info.token = jwt.sign(token, Key, { expiresIn: 60 * 30 });

	res.status(200).json(msg);
};

export default respOk;
