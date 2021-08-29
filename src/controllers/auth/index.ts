// modules
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';
const key: string = '_secreto';

import { getRepository } from 'typeorm';

// services and hooks and personal interface
import { Api, DB } from '../../interfaces';
import { mail } from '../../services';

// db talbes
import fm_client from '../../db/models/fm_client';
import fm_phone from '../../db/models/fm_phone';
import fm_worker from '../../db/models/fm_worker';

// getter a Client
export const register = async (
	req: Request<any, Api.resp, fm_worker>,
	res: Response<Api.resp<{ token: string }>>,
	next: NextFunction,
): Promise<void> => {
	try {
		validationResult(req).throw();

		const { password, phone, email, id_ident_type, ident_num } = req.body;

		// validar existencia de la clave cumpuesta
		const validIdent = await getRepository(fm_client).findOne({ id_ident_type, ident_num });
		if (validIdent) throw { message: 'el documento de identidad ya existe' };

		// validar existencia de la clave cumpuesta
		const validMail = await getRepository(fm_client).findOne({ email });
		if (validMail) throw { message: 'el correo ya existe' };

		// encript password
		const salt: string = await bcrypt.genSalt(10);
		req.body.password = await bcrypt.hash(password, salt);

		const resp = await getRepository(fm_worker).save(req.body);

		// enviar correo de validacion
		await mail.verify(req.body);

		// generar token
		const token = jwt.sign({ id: resp.id }, key);

		// response
		res.status(200).json({ message: 'Usuario registrado Revise su correo por favor', info: { token } });
	} catch (err) {
		next(err);
	}
};

// register valid 1
export const registerValid1 = async (
	req: Request<any, Api.resp, fm_client>,
	res: Response<Api.resp>,
	next: NextFunction,
): Promise<void> => {
	try {
		validationResult(req).throw();

		const { email } = req.body;

		// validar existencia de la clave cumpuesta
		const Client = await getRepository(fm_client).findOne({ email });
		if (Client) throw { message: 'el correo ya existe' };

		res.status(200).json({ message: 'ok' });
	} catch (err) {
		next(err);
	}
};

// getter a Client
export const login = async (
	req: Request<any, Api.resp, fm_worker>,
	res: Response<Api.resp>,
	next: NextFunction,
): Promise<void> => {
	try {
		const { password, email } = req.body;

		// encript password
		const user = await getRepository(fm_worker).findOne({ where: { email } });
		if (!user) throw { message: 'correo o contraseña incorrecta', code: 400 };

		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) throw { message: 'correo o contraseña incorrecta', code: 400 };

		const token = jwt.sign({ id: user.id }, key);

		// response
		res.status(200).json({ message: 'Usuario logeado con exito', info: { token } });
	} catch (err) {
		next(err);
	}
};

// this function is for emit a mail for edit a password
export const passMail = async (
	req: Request<any, Api.resp, fm_worker>,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		// define email
		const { email } = req.body;
		// query for valid email
		const Client = await getRepository(fm_worker).findOne({ where: { email } });
		if (!Client) throw { message: `El correo ${email} no se encuentra registrado en la plataforma`, code: 400 };

		// emit mail
		await mail.newPass(Client);

		// response
		res.status(200).json({ message: 'Le hemos enviado un correo electrónico para recuperar su contraseña' });
	} catch (err) {
		next(err);
	}
};

// editar usuarios
export const editPass = async (
	req: Request<Api.params, Api.resp, fm_worker>,
	res: Response<Api.resp>,
	next: NextFunction,
): Promise<void> => {
	try {
		// encript password
		const salt: string = await bcrypt.genSalt(10);
		req.body.password = await bcrypt.hash(`${req.body.password}`, salt);

		// define email
		const { password } = req.body;
		const { id }: any = req.headers.token;

		// query for valid email
		await getRepository(fm_client)
			.createQueryBuilder()
			.update(fm_worker)
			.set({ password })
			.where('id = :id', { id })
			.execute();

		// response
		res.status(200).json({ message: 'Contraseña actualizada con exito' });
	} catch (err) {
		next(err);
	}
};
