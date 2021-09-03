import { Response, Request, NextFunction } from 'express';
import { Api } from 'interfaces';
import fm_client from '../../db/models/fm_client';
import { getRepository } from 'typeorm';
export const userByID = async (
	req: Request<any, Api.resp, fm_client>,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		const { id }: any = req.headers.token;

		const user: any = await getRepository(fm_client).findOne({ id });
		const { password, ...info }: fm_client = user;

		res.status(200).json({ message: 'data del usuario', info });
	} catch (err) {
		next(err);
	}
};
