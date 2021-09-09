/**
 * este middleware esta enfocado en filter,
 * validar y pre procesar,los archivos
 * recibidos desde el front.
 */

import { NextFunction, Request, Response } from 'express';
import multer, { diskStorage, StorageEngine, Options } from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const filename = (req: Request, file: Express.Multer.File, cb: any) => {
	cb(null, uuidv4() + '@' + file.originalname.replace(/ /gi, '_'));
};

const storage: StorageEngine = diskStorage({
	destination: path.resolve('static'),
	filename,
});

const options: Options = {
	fileFilter: (req, file, cb) => {
		const filetypes = /jpeg|jpg|png|svg/;
		const mimetype = filetypes.test(file.mimetype);
		const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
		if (mimetype && extname) {
			return cb(null, true);
		} else {
			cb({
				name: file.originalname,
				message: 'Error: File upload only supports the following filetypes - ' + filetypes,
			});
		}
	},
	limits: { fileSize: 10000000 },
	storage,
};

export const upload = multer(options).single('image');

export const FM_RC = () => {
	return [
		multer(options).array('rc_constitutive_act', 1),
		multer(options).array('rc_property_document', 1),
		multer(options).array('rc_service_document', 1),
		multer(options).array('rc_special_contributor', 1),
		multer(options).array('rc_ref_bank', 1),
		multer(options).array('rc_ref_perso', 1),
		multer(options).array('rc_account_number', 1),
		multer(options).array('rc_front_local', 1),
		multer(options).array('rc_in_local', 1),
		multer(options).array('rc_rif', 1),
		multer(options).array('rc_ident_card', 1),
	];
};

export const uploads = multer(options).array('images', 20);
