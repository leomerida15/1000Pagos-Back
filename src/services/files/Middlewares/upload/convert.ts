import { NextFunction, Request, Response } from 'express';
import { Doc } from '../../../../hooks/docs';

const convert = async (req: Request, res: Response, next: NextFunction) => {
	let files: any = req.files;

	if (files.images) {
		const stop: Promise<void>[] = files.images.map(async (file: any, i: number) => {
			const from: string = file.mimetype.split('/').pop();

			if (['pdf','png'].includes(from)) {
				//
				await Doc.Convert(file.filename, 'jpg');

				let filename = file.filename.split('.');
				filename.pop();
				filename.push('jpg');
				file.filename = filename.join('.');

				let filepath = file.path.split('.');
				filepath.pop();
				filepath.push('jpg');
				files.path = filepath.join('.');

				file.mimetype = file.mimetype.replace(from, 'jpg');
			}
		});

		await Promise.all(stop);
	}

	next();
};

export default convert;
