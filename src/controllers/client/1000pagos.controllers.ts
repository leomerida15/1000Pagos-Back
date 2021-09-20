import { Response, NextFunction, Request } from 'express';
import { Doc } from '../../hooks/docs';
import { getRepository } from 'typeorm';
import fm_photo from '../../db/models/fm_photo';
import { Api } from '../../interfaces';
import { base } from '../../hooks/docs/doc';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import fm_request from '../../db/models/fm_request';

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
		let info: any = {};

		const { id_client, id_commerce } = req.body;

		const description = [
			'rc_constitutive_act',
			'rc_property_document',
			'rc_service_document',
			'rc_ref_bank',
			'rc_ref_perso',
			'rc_account_number',
			'rc_rif',
			'rc_ident_card',
			'rc_special_contributor',
		];

		if (files.length === 0) {
			const fm: any = await getRepository(fm_request)
				.createQueryBuilder('fm_request')
				.addOrderBy('createdAt')
				.where('id_client = :id_client', { id_client })
				.getOne();

			const {
				rc_constitutive_act,
				rc_property_document,
				rc_service_document,
				rc_special_contributor,
				rc_ref_bank,
				rc_ref_perso,
				rc_account_number,
				rc_rif,
				rc_ident_card,
			} = fm;

			info = {
				rc_constitutive_act,
				rc_property_document,
				rc_service_document,
				rc_special_contributor,
				rc_ref_bank,
				rc_ref_perso,
				rc_account_number,
				rc_rif,
				rc_ident_card,
			};
		} else {
			const valid_description: any[] = files.filter((file: Express.Multer.File) =>
				description.includes(file.originalname)
			);

			if (valid_description.length) {
				throw { message: `${valid_description.length} imagenes no tiene un nomre referente a un recaudo` };
			}

			if (!existsSync(`${base}/${id_client}`)) {
				await fs.mkdir(`${base}/${id_client}`);
			}
			if (!existsSync(`${base}/${id_client}/${id_commerce}`)) {
				await fs.mkdir(`${base}/${id_client}/${id_commerce}`);
			}

			const stop: Promise<void>[] = files.map(async (file: Express.Multer.File, i: number): Promise<void> => {
				const link = await Doc.Move(file.filename, `${id_client}/${id_commerce}`);
				const path = `static/${id_client}/${id_commerce}/${file.filename}`;

				const descript = ((): string => {
					if (file.originalname.includes('.jpg')) return file.originalname.replace('.jpg', '');
					else return file.originalname.replace('.png', '');
				})();

				const data = getRepository(fm_photo).create({ name: file.filename, path, link, descript });
				const save = await getRepository(fm_photo).save(data);

				info[descript] = save.id;
			});
			await Promise.all(stop);
		}

		res.status(200).json({ message: 'archivos listos', info });
	} catch (err) {
		next(err);
	}
};
