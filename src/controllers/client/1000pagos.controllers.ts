import { Response, NextFunction, Request } from 'express';
import { Doc } from '../../hooks/docs';
import { getRepository } from 'typeorm';
import fm_photo from '../../db/models/fm_photo';
import { Api } from '../../interfaces';

export const upFileRecaudos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const { filename }: any = req.file;
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
		const files: any = req.files;

		if (files.length < 10) throw { message: `solo envio ${files.length} imagenes y deben ser min 10`, code: 400 };

		const { email } = req.body;

		const description = [
			'rc_constitutive_act',
			'rc_property_document',
			'rc_service_document',
			'rc_ref_bank',
			'rc_ref_perso',
			'rc_account_number',
			'rc_front_local',
			'rc_in_local',
			'rc_rif',
			'rc_ident_card',
			'rc_special_contributor',
		];

		const valid_description: any[] = files.filter((file: Express.Multer.File) =>
			description.includes(file.originalname)
		);

		if (valid_description.length) {
			throw { message: `${valid_description.length} imagenes no tiene un nomre referente a un recaudo` };
		}

		let info: any = {
			rc_constitutive_act: 0,
			rc_property_document: 0,
			rc_service_document: 0,
			rc_ref_bank: 0,
			rc_ref_perso: 0,
			rc_account_number: 0,
			rc_front_local: 0,
			rc_in_local: 0,
			rc_rif: 0,
			rc_ident_card: 0,
			rc_special_contributor: 0,
		};

		const stop: Promise<void>[] = files.map(async (file: Express.Multer.File, i: number): Promise<void> => {
			const link = await Doc.Move(file.filename, email);
			const path = `${email}/${file.fieldname}`;

			const descript: any = file.originalname;

			const data = getRepository(fm_photo).create({ name: file.filename, path, link, descript });
			const save = await getRepository(fm_photo).save(data);

			info[descript] = save.id;
		});
		await Promise.all(stop);

		console.log('info', info);

		res.status(200).json({ message: 'archivos subidor', info });
	} catch (err) {
		next(err);
	}
};
