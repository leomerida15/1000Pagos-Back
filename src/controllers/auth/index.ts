import { NextFunction, Request, Response } from 'express';
const { validationResult } = require('express-validator');
import { Clinet } from '../../db/models';
import bcrypt from 'bcrypt';
import { Api, DB } from '../../interfaces';
import * as Msg from '../../hooks/messages/index.ts';
import { Model } from 'sequelize/types';
import { mail } from '../../services';
import jwt from 'jsonwebtoken';
const key: string = '_secreto';

// getter a Clinet
export const register = async (
	req: Request<any, Api.resp, DB.Clinet>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		validationResult(req).throw();

		const { password }: any = req.body;

		// encript password
		const salt: string = await bcrypt.genSalt(10);
		req.body.password = await bcrypt.hash(password, salt);

		const clinet: any = await Clinet.create<Model<DB.Clinet>>(req.body);

		// enviar correo de validacion
		mail.verify(clinet);

		const token = jwt.sign({ id: clinet.id }, key);

		// response
		res.status(200).json({ message: 'Usuario registrado Revise su correo por favor', info: { token } });
	} catch (err) {
		next(err);
	}
};

// getter a Clinet
export const login = async (
	req: Request<any, Api.resp, DB.Clinet>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { password, email }: any = req.body;

		// encript password

		const clinet: DB.Clinet | any = await Clinet.findOne<Model<DB.Clinet, DB.Clinet>>({ where: { email } });
		if (!clinet) throw { message: 'correo o contraseña incorreto', code: 400 };

		const salt: string = await bcrypt.genSalt(10);

		const validPassword = await bcrypt.compare(password, clinet.password);
		if (!validPassword) throw { message: 'correo o contraseña incorreto', code: 400 };

		const token = jwt.sign({ id: clinet.id }, key);

		// response
		res.status(200).json({ message: 'Usuario logeado con exito', info: { token } });
	} catch (err) {
		next(err);
	}
};

// this function is for emit a mail for edit a password
export const passMail = async (
	req: Request<any, Api.resp, DB.Clinet>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		// define email
		const { email }: any = req.body;
		// query for valid email
		const clinet: any = await Clinet.findOne({ where: { email } });
		if (!Clinet) throw { message: `El correo ${email} no se encuentra registrado en la plataforma`, code: 400 };

		// emit mail
		await mail.newPass(clinet);

		// response
		res.status(200).json({ message: 'Le hemos enviado un correo electrónico para recuperar su contraseña' });
	} catch (err) {
		err.logger = true;
		next(err);
	}
};

// editar usuarios
export const editPass = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		// encript password
		const salt: string = await bcrypt.genSalt(10);
		req.body.password = await bcrypt.hash(`${req.body.password}`, salt);

		// define email
		const { password } = req.body;
		const { id }: any = req.headers.token;

		// query for valid email
		await Clinet.update({ password }, { where: { id } });

		// response
		res.status(200).json({ message: 'Contraseña actualizada con exito' });
	} catch (err) {
		err.logger = true;
		next(err);
	}
};
