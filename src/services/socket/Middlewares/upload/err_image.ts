// modules
import { Request, Response, NextFunction } from 'express';
import fs from 'fs/promises';

export const file_files_err = async (err: any, req: Request, res: Response, next: NextFunction) => {
	if (req.file) {
		let valid: any = 0;
		const { path, filename } = err.file;
		if (err.model) valid = err.model.find({ image: filename });

		if (valid.length === 0 || !err.model) await fs.unlink(path);
	} else if (req.files && req.files.length) {
		let valid: any = 0;
		const images = err.files.map((file: any) => ({ image: file.filename }));
		if (err.model) valid = err.model.find({ $or: images });

		if (valid.length === 0) {
			const array = err.files.map(async (file: any) => {
				const { path } = file;
				await fs.unlink(path);
			});

			await Promise.all(array);
		}
	}
	next(err);
};
