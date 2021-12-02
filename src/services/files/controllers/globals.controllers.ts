import { NextFunction, Request, Response } from 'express';
import Msg from '../../../hooks/messages/index.ts';
import Resp from '../../../services/office/Middlewares/res';
import { Api } from '../../../interfaces';
import { getRepository } from 'typeorm';
import fm_photo from '../../../db/models/fm_photo';

export const createImage = async (
	req: Request<any, Api.Resp, fm_photo>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const file: any = req.file;

		const { filename, path } = file;

		const info = await getRepository(fm_photo).save({ name: filename, path, descript: filename });

		const message: string = Msg('Imagen').create;

		res.status(200).json({ message, info });
	} catch (err) {
		next(err);
	}
};

export const createImages = async (
	req: Request<any, Api.Resp, fm_photo[]>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		// const info = await getRepository(fm_photo).save(req.body);

		const message: string = Msg('Imagenes').create;

		res.status(200).json({ message, info: req.files });
	} catch (err) {
		next(err);
	}
};

export const deleteImages = async (
	req: Request<Api.params, Api.Resp, fm_photo[]>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const { id } = req.params;
		// const info = await getRepository(fm_photo).delete(id);

		const message: string = Msg('Imagen', id).delete;

		Resp(req, res, { message: 'no estoy funcionando', info: '' });
	} catch (err) {
		next(err);
	}
};

export const getImageById = async (
	req: Request<Api.params, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const { id } = req.params;
		const info = await getRepository(fm_photo).findOne(id);

		const message: string = Msg('Imagen', id).getBy('id');

		Resp(req, res, { message, info });
	} catch (err) {
		next(err);
	}
};
