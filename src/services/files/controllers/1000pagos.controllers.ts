import { Response, NextFunction, Request } from 'express';
import { Doc } from '../../../hooks/docs';
import { getRepository } from 'typeorm';
import fm_photo from '../../../db/models/fm_photo';
import { Api } from '../../../interfaces';
import { base } from '../../../hooks/docs/doc';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import fm_request from '../../../db/models/fm_request';
import fm_client from '../../../db/models/fm_client';
import fm_commerce from '../../../db/models/fm_commerce';
import fm_valid_request from '../../../db/models/fm_valid_request';
import fm_status from '../../../db/models/fm_status';

export const upFileRecaudos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const { filename }: any = req.file;
		const { user } = req.body;
		const path = await Doc.Move(filename, user);

		const data = getRepository(fm_photo).create({ name: filename, path });
		const info = await getRepository(fm_photo).save(data);

		res.status(200).json({ message: 'archivo subidor', info });
	} catch (err) {
		next(err);
	}
};

// subir varias imagenes
export const upFilesRecaudos = async (
	req: Request<any, Api.Resp, Api.RC>,
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
			relations: [
				'rc_constitutive_act',
				'rc_ref_bank',
				'rc_rif',
				'rc_ident_card',
				'rc_special_contributor',
				'rc_comp_dep',
			],
		});

		if (client && fm) {
			const { rc_special_contributor, rc_ref_bank, rc_rif, rc_constitutive_act, rc_ident_card }: any = fm;

			if (commerce) {
				info = {
					rc_ident_card: rc_ident_card && rc_ident_card.id,
					rc_rif: rc_rif && rc_rif.id,
					rc_special_contributor: rc_special_contributor && rc_special_contributor.id,
					rc_ref_bank: rc_ref_bank && rc_ref_bank.id,
					rc_constitutive_act: rc_constitutive_act && rc_constitutive_act.id,
				};
			} else {
				info = {
					rc_ident_card: rc_ident_card && rc_ident_card.id,
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
			console.log('carpeta del cliente', id_client);

			await fs.mkdir(`${base}/${id_client}`);
		}
		if (!existsSync(`${base}/${id_client}/${id_commerce}`)) {
			console.log('carpeta del comercio', id_commerce);

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
				const path = `static/${route_ids}/${file.filename}`;

				const data = getRepository(fm_photo).create({ name: file.filename, path, descript });
				const save = await getRepository(fm_photo).save(data);

				info[descript] = save.id;
			});

		await Promise.all(stop);

		res.status(200).json({ message: 'archivos listos', info });
	} catch (err) {
		next(err);
	}
};

// editar recaudos de diferido
export const editRcByFm = async (
	req: Request<Api.pFM, Api.Resp, fm_valid_request>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { id_request } = req.params;
		const files: any = req.files;

		console.log('files', req.files);

		const fm: any = await getRepository(fm_request).findOne(id_request, {
			order: { id: 'ASC' },
			relations: [
				'rc_constitutive_act',
				'rc_ref_bank',
				'rc_rif',
				'rc_ident_card',
				'rc_special_contributor',
				'rc_comp_dep',
			],
		});
		if (!fm) throw { message: 'el FM suministrado no existe', code: 400 };

		const { id_client, id_commerce, id_valid_request } = fm;

		const description = [
			'rc_constitutive_act',
			'rc_ref_bank',
			'rc_rif',
			'rc_ident_card',
			'rc_special_contributor',
			'rc_comp_dep',
		];

		let valids: any = {};

		const stop: Promise<void>[] = files
			.filter((file: Express.Multer.File): boolean => {
				const valid: string = file.originalname.replace(/(.png$|.png$|.jpeg$|.pdf$|.jpg$)/g, '');
				return description.includes(valid);
			})
			.map(async (file: Express.Multer.File, i: number): Promise<void> => {
				const descript: any = file.originalname.replace(/(.png$|.png$|.jpeg$|.pdf$|.jpg$)/g, '');

				await Doc.Delete(fm[descript].path);

				const route_ids: string = ['rc_ident_card'].includes(descript)
					? `${id_client}`
					: `${id_client}/${id_commerce}`;

				await Doc.Move(file.filename, route_ids);

				const path = `static/${route_ids}/${file.filename}`;

				console.log('path', path);

				console.log('fm[descript].id', fm[descript].id);

				await getRepository(fm_photo).update(fm[descript].id, { path });

				valids[descript.replace('rc_', 'valid_')] = '';
			});

		await Promise.all(stop);

		await getRepository(fm_status).update({ id_request: fm.id, id_department: 1 }, { id_status_request: 3 });

		res.status(200).json({ message: 'imagenes editadas' });
	} catch (err) {
		next(err);
	}
};
