import { Response, NextFunction, Request } from 'express';
import { Doc } from '../../hooks/docs';
import { getConnection, getRepository } from 'typeorm';
import fm_photo from '../../db/models/fm_photo';
import { Api } from '../../interfaces';
import { base } from '../../hooks/docs/doc';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import fm_request from '../../db/models/fm_request';
import fm_client from '../../db/models/fm_client';
import fm_commerce from '../../db/models/fm_commerce';
import fm_bank_commerce from '../../db/models/fm_bank_commerce';

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

		console.log('body',req.body);
		

		const { id_client, id_commerce, bank_account_num }: any = req.body;

		

		const client = await getRepository(fm_client).findOne(id_client);
		
		const commerce = await getRepository(fm_commerce).findOne(id_client);
		const bank = await getRepository(fm_bank_commerce).findOne({ bank_account_num, id_commerce, id_client });

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

		if (client &&  await getRepository(fm_request).findOne({id_client})) {
			const fm: any = await getConnection().query('select * FROM fm_request WHERE id_client = '+id_client+'  ORDER by id ASC LIMIT 1')



			const {
				rc_property_document,
				rc_service_document,
				rc_special_contributor,
				rc_ref_bank,
				rc_ref_perso,
				rc_rif,
				rc_account_number,
				rc_constitutive_act,
				rc_ident_card,
			} = fm[0];
			console.log('commerce',commerce);
			
			
			if (commerce) {
				info = {
					rc_ident_card,
					rc_ref_perso,
					rc_rif,
					rc_special_contributor,
					rc_ref_bank,
					rc_constitutive_act,
					rc_property_document,
					rc_service_document,
				};
			} else {
				info = {
					rc_ref_perso,
					rc_ident_card,
				};
			}
			if (bank) info = { ...info, rc_account_number };
		}

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
			const descript: string = file.originalname
				.replace(/.png/g, '')
				.replace(/.jpeg/g, '')
				.replace(/.pdf/g, '')
				.replace(/.jpg/g, '');

			const route_ids: string = ['rc_ident_card', 'rc_ref_perso'].includes(descript)
				? `${id_client}`
				: `${id_client}/${id_commerce}`;

			const link = await Doc.Move(file.filename, route_ids);
			const path = `static/${route_ids}/${file.filename}`;

			const data = getRepository(fm_photo).create({ name: file.filename, path, link, descript });
			const save = await getRepository(fm_photo).save(data);

			info[descript] = save.id;
		});
		await Promise.all(stop);

		console.log('info',info);
		

		res.status(200).json({ message: 'archivos listos', info });
	} catch (err) {
		next(err);
	}
};
