import { NextFunction, Request, Response } from 'express';
import { Doc } from '../../../../hooks/docs';

const convert = async (req: Request, res: Response, next: NextFunction) => {
	console.log('req.files', req.files);

	let files: any = req.files;

	if (files.image) {
		const stop: Promise<void>[] = files.image.map(async (file: any, i: number) => {
			const from: string = file.mimetype.split('/')[file.mimetype.split('.').length - 1];
			if (['pdf', 'png'].includes(from)) {
				//
				//
				await Doc.Convert(file.filename, 'jpg');

				let filename = file.filename.split('.');
				filename[filename.length - 1] = 'jpg';

				files[i].filename = filename.join('.');

				let filepath = file.path.split('.');
				filepath[filepath.length - 1] = 'jpg';

				files[i].path = filepath.join('.');

				file.mimetype = file.mimetype.replace(
					from,
					'jpg'
				);
				files[i].mimetype = file.mimetype;

				let originalname = file.originalname.split('.');
				originalname[originalname.length - 1] = 'jpg';

				files[i].originalname = originalname.join('.');
			}
		});

		await Promise.all(stop);
	}

	if (files.images) {
		const stop: Promise<void>[] = files.images.map(async (file: any, i: number) => {
			const from: string = file.mimetype.split('/')[file.mimetype.split('.').length - 1];
			if (['pdf', 'png'].includes(from)) {
				//
				await Doc.Convert(file.filename, 'jpg');

				let filename = file.filename.split('.');
				filename[filename.length - 1] = 'jpg';

				files[i].filename = filename.join('.');

				let filepath = file.path.split('.');
				filepath[filepath.length - 1] = 'jpg';

				files[i].path = filepath.join('.');

				file.mimetype = file.mimetype.replace(
					from,
					'jpg'
				);
				
			}
		});

		await Promise.all(stop);
	}

	next();
};

export default convert;
