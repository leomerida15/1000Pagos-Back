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

		const { id_client, id_commerce }: any = req.body;

		const client = await getRepository(fm_client).findOne(id_client);
		if (!client) throw { message: 'el cliente suministrado no existe', code: 400 };

		const commerce = await getRepository(fm_commerce).findOne(id_client);
		if (!commerce) throw { message: 'el comercio suministrado no existe', code: 400 };

		const description = [
			'rc_constitutive_act',
			'rc_ref_bank',
			'rc_rif',
			'rc_ident_card',
			'rc_special_contributor',
			'rc_comp_dep',
		];

		const fm = await getRepository(fm_request).findOne({
			where: { id_client },
			order: { id: 'ASC' },
		});

		if (client && fm) {
			const { rc_special_contributor, rc_ref_bank, rc_rif, rc_constitutive_act, rc_ident_card } = fm;

			if (commerce) {
				info = {
					rc_ident_card,
					rc_rif,
					rc_special_contributor,
					rc_ref_bank,
					rc_constitutive_act,
				};
			} else {
				info = {
					rc_ident_card,
				};
			}
		}

		const valid_description: any[] = files.filter((file: Express.Multer.File) =>
			description.includes(file.originalname)
		);

		if (valid_description.length) {
			throw { message: `${valid_description.length} imagenes no tiene un nombre referente a un recaudo` };
		}

		if (!existsSync(`${base}/${id_client}`)) {
			await fs.mkdir(`${base}/${id_client}`);
		}
		if (!existsSync(`${base}/${id_client}/${id_commerce}`)) {
			await fs.mkdir(`${base}/${id_client}/${id_commerce}`);
		}

		const stop: Promise<void>[] = files
			.filter((file: Express.Multer.File) => {
				const valid: string = file.originalname.replace(/(.png$|.png$|.jpeg$|.pdf$|.jpg$)/g, '');
				return description.includes(valid);
			})
			.map(async (file: Express.Multer.File, i: number): Promise<void> => {
				const descript: string = file.originalname.replace(/(.png$|.png$|.jpeg$|.pdf$|.jpg$)/g, '');

				const route_ids: string = ['rc_ident_card'].includes(descript)
					? `${id_client}`
					: `${id_client}/${id_commerce}`;

				await Doc.Move(file.filename, route_ids);
				const link = `${process.env.HOST}static/${route_ids}/${file.filename}`;
				const path = `static/${route_ids}/${file.filename}`;

				const data = getRepository(fm_photo).create({ name: file.filename, path, link, descript });
				const save = await getRepository(fm_photo).save(data);

				info[descript] = save.id;
			});

		await Promise.all(stop);

		res.status(200).json({ message: 'archivos listos', info });
	} catch (err) {
		next(err);
	}
};
