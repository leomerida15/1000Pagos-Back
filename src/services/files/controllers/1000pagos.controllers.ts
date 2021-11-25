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
		console.log('files', req.files);

		const files: any = req.files;
		let info: any = {};

		// definimos los ids de cliente y comercio
		const { id_client, id_commerce }: any = req.body;

		// lista dereacudos
		const description = ['rc_ref_bank', 'rc_rif', 'rc_ident_card', 'rc_special_contributor', 'rc_comp_dep'];

		// query que retorna el ultimo fm con ese comercio y cliente
		const fm = await getRepository(fm_request).findOne({
			where: { id_client, id_commerce },
			order: { id: 'ASC' },
			relations: [
				'rc_ref_bank',
				'id_client',
				'id_client.rc_ident_card',
				'id_commerce',
				'id_commerce.rc_constitutive_act',
				'id_commerce.rc_rif',
				'id_commerce.rc_special_contributor',
				'rc_comp_dep',
			],
		});
		// if (!fm) throw { message: 'no existe fm con esos datos', code: 400 };

		if (fm?.id_client && fm) {
			const { id_commerce, id_client } = fm;
			const { rc_ident_card }: any = id_client;
			const { rc_special_contributor, rc_constitutive_act, rc_ref_bank, rc_rif }: any = id_commerce;

			if (fm.id_commerce) {
				info = {
					rc_ident_card: rc_ident_card && rc_ident_card.id,
					rc_rif: rc_rif && rc_rif.id,
					rc_special_contributor: rc_special_contributor && rc_special_contributor.id,
					rc_ref_bank: rc_ref_bank && rc_ref_bank.id,
					rc_constitutive_act: rc_constitutive_act ? rc_constitutive_act.map((item: any) => item.id) : [],
				};
			} else {
				info = {
					rc_ident_card: rc_ident_card && rc_ident_card.id,
				};
			}
		} else {
			info = {
				rc_constitutive_act: [],
			};
		}

		// validamos la lista de imagenes
		const v_descript = files.images.filter((file: any) => description.includes(file.originalname)).length;

		// filtramos si envia imagenes con nobres no validos
		if (v_descript) throw { message: `${v_descript} imagenes no tiene un nombre referente a un recaudo` };

		// validamos que exista la carpeta corespondiente
		if (!existsSync(`${base}/${id_client}`)) await fs.mkdir(`${base}/${id_client}`);

		if (!existsSync(`${base}/${id_client}/${id_commerce}`)) await fs.mkdir(`${base}/${id_client}/${id_commerce}`);

		if (!existsSync(`${base}/${id_client}/${id_commerce}/constitutive_act`)) {
			await fs.mkdir(`${base}/${id_client}/${id_commerce}/constitutive_act`);
		}

		const stop: Promise<void>[] = files.images
			.filter((file: Express.Multer.File) => {
				const valid: string = file.originalname.replace(/(.png$|.png$|.jpeg$|.pdf$|.jpg$)/g, '');
				// console.log(' description.includes(val`id)', description.includes(valid));

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

		if (files.constitutive_act) {
			const stop2 = files.constitutive_act.map(async (file: Express.Multer.File, i: number): Promise<void> => {
				await Doc.Move(file.filename, `${id_client}/${id_commerce}/constitutive_act`);
				const path = `static/${id_client}/${id_commerce}/constitutive_act/${file.filename}`;

				const data = getRepository(fm_photo).create({
					name: file.filename,
					path,
					descript: 'rc_constitutive_act',
				});
				const save = await getRepository(fm_photo).save(data);

				info.rc_constitutive_act.push(save.id);
			});

			await Promise.all(stop2);
		}

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

		//console.log('files', req.files);

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

		const { id_client, id_commerce } = fm;

		// console.log('id_client}/${id_commerce',id_client,id_commerce);

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

				//await Doc.Move(file.filename, route_ids);

				const path = `static/${route_ids}/${file.filename}`;

				// console.log('path', path);

				// console.log('fm[descript].id', fm[descript].id);

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
