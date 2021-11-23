import { NextFunction, Request, Response } from 'express';
import { Doc } from '../../../../hooks/docs';

const convert = async (req: Request, res: Response, next: NextFunction) => {
	if (req.file) {
		await Doc.Convert(req.file.filename, 'jpg');

		let filename = req.file.filename.split('.');
		filename[filename.length - 1] = 'jpg';

		req.file.filename = filename.join('.');

		let filepath = req.file.path.split('.');
		filepath[filepath.length - 1] = 'jpg';

		req.file.path = filepath.join('.');

		req.file.mimetype = req.file.mimetype.replace(
			req.file.filename.split('.')[req.file.filename.split('.').length - 1],
			'jpg'
		);

		let originalname = req.file.originalname.split('.');
		originalname[originalname.length - 1] = 'jpg';

		req.file.originalname = originalname.join('.');
	} else if (req.files) {
		let files: any = req.files;

		const stop: Promise<void>[] = files.map(async (file: any, i: number) => {
			await Doc.Convert(file.filename, 'jpg');

			let filename = file.filename.split('.');
			filename[filename.length - 1] = 'jpg';

			files[i].filename = filename.join('.');

			let filepath = file.path.split('.');
			filepath[filepath.length - 1] = 'jpg';

			files[i].path = filepath.join('.');

			file.mimetype = file.mimetype.replace(file.filename.split('.')[file.filename.split('.').length - 1], 'jpg');
			files[i].mimetype = file.mimetype;

			let originalname = file.originalname.split('.');
			originalname[originalname.length - 1] = 'jpg';

			files[i].originalname = originalname.join('.');
		});

		await Promise.all(stop);
	}

	// console.log('req.files',req.files);

	next();
};

export default convert;
