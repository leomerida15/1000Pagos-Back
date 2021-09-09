import { Response, NextFunction, Request } from 'express';
import { Doc } from '../../hooks/docs';
import { getRepository } from 'typeorm';
import fm_photo from '../../db/models/fm_photo';
import { Api } from '../../interfaces';

export const upFileRecaudos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const { filename }: Express.Multer.File = req.file;
		const { legend, user } = req.body;
		const path = await Doc.Move(filename, user);
		const link = Doc.Route(filename, user);

		const data = getRepository(fm_photo).create({ name: filename, path, link });
		const info = await getRepository(fm_photo).save(data);

		res.status(200).json({ message: 'archivo subidor', info });
	} catch (err) {
		next(err);
	}
};

// subir varias imagenes
export const upFilesRecaudos = async (
	req: Request<any, Api.resp, Api.RC>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		console.log('body', req.body);

		const { user, ...rcs } = req.body;

		const legend = Object.entries(rcs).map(([key, value]) => {});
		console.log('hola');

		const description = {
			rc_constitutive_act: 0,
			rc_property_document: 1,
			rc_service_document: 2,
			rc_special_contributor: 3,
			rc_ref_bank: 4,
			rc_ref_perso: 5,
			rc_account_number: 6,
			rc_front_local: 7,
			rc_in_local: 8,
			rc_rif: 9,
			rc_ident_card: 10,
		};

		const files: any = req.files;

		console.log('files', files);

		if (legend.length !== files.length) {
			throw { code: 400, message: 'el numero de archivos, no coinside con su leyenda' };
		}

		// const stop: Promise<fm_photo>[] = files.map(
		// 	async (file: Express.Multer.File, i: number): Promise<fm_photo> => {
		// 		const path = await Doc.Move(file.filename, user);
		// 		const link = Doc.Route(file.filename, user);

		// 		const descript = legend.filter((a): boolean => a.i === i)[0].descript;

		// 		return getRepository(fm_photo).create({ name: file.filename, path, link, descript });
		// 	}
		// );

		// const data: fm_photo[] = await Promise.all(stop);

		// const info = await getRepository(fm_photo).save(data);

		res.status(200).json({ message: 'archivos subidor' });
	} catch (err) {
		next(err);
	}
};
