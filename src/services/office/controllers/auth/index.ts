// modules
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';
const key: string = '_secreto';

import { getRepository } from 'typeorm';

// services and hooks and personal interface
import { Api } from '../../../../interfaces';
import { mail } from '../../../../helpers';

// db talbes
import fm_worker from '../../../../db/models/fm_worker';
import Resp from '../../Middlewares/res';

// getter a Client
export const register = async (
	req: Request<any, Api.Resp, fm_worker>,
	res: Response<Api.Resp<{ token: string; data: any }>>,
	next: NextFunction
): Promise<void> => {
	try {
		validationResult(req).throw();

		const { email, id_ident_type, ident_num } = req.body;

		// validar existencia de la clave cumpuesta
		const validIdent = await getRepository(fm_worker).findOne({ id_ident_type, ident_num });
		if (validIdent) throw { message: 'el documento de identidad ya existe' };

		// validar existencia de la clave cumpuesta
		const validMail = await getRepository(fm_worker).findOne({ email });
		if (validMail) throw { message: 'el correo ya existe' };

		// encript password
		const salt: string = await bcrypt.genSalt(10);
		req.body.password = await bcrypt.hash(req.body.password, salt);

		req.body.roles = [{ id: 2, name: 'worker' }];

		await getRepository(fm_worker).save(req.body);
		// encript password
		const worker = await getRepository(fm_worker).findOne({ where: { email }, relations: ['roles'] });

		const { password, id, roles, ...data_user }: any = worker;

		// generar token
		const token = jwt.sign({ id, roles }, key, { expiresIn: 60 * 30 });

		// enviar correo de validacion
		await mail.verify(req.body);

		// Response
		res.status(200).json({
			message: 'Trabajador registrado Revise su correo por favor',
			info: { ...data_user, roles },
			token,
		});
	} catch (err) {
		next(err);
	}
};

// register valid 1
export const registerValid1 = async (
	req: Request<any, Api.Resp, fm_worker>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		validationResult(req).throw();

		const { email } = req.body;

		// validar existencia de la clave cumpuesta
		const Worker = await getRepository(fm_worker).findOne({ email });
		if (Worker) throw { message: 'el correo ya existe' };

		res.status(200).json({ message: 'ok' });
	} catch (err) {
		next(err);
	}
};

// register valid 1
export const registerValid2 = async (
	req: Request<any, Api.Resp, fm_worker>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		validationResult(req).throw();

		const { id_ident_type, ident_num } = req.body;

		// validar existencia de la clave cumpuesta
		const Worker = await getRepository(fm_worker).findOne({ id_ident_type, ident_num });
		if (Worker) throw { message: 'el documento de identidad ya existe' };

		res.status(200).json({ message: 'ok' });
	} catch (err) {
		next(err);
	}
};

const block = async (email: string): Promise<void> => {
	await getRepository(fm_worker)
		.createQueryBuilder()
		.update(fm_worker)
		.set({ block: () => 'block + 1' })
		.where('email = :email', { email })
		.execute();
};
// getter a Client
export const login = async (
	req: Request<any, Api.Resp, fm_worker>,
	res: Response<Api.Resp<{ token: string; data: any }>>,
	next: NextFunction
): Promise<void> => {
	const { email } = req.body;

	try {
		// encript password
		const worker = await getRepository(fm_worker).findOne({
			where: { email },
			relations: ['roles', 'id_department'],
		});

		if (!worker) throw { message: 'correo o contraseña incorrecta', code: 400 };

		// extraemos data
		const { password, id, roles, block, ...data_user }: any = worker;

		const validPassword = await bcrypt.compare(req.body.password, password);
		if (!validPassword) {
			if (block === 0) throw { message: 'Le quedan 2 intentos', code: 400, valid: true };
			//
			else if (block === 1) throw { message: 'Le queda 1 intento', code: 400, valid: true };
			//
			else if (block === 2) throw { message: 'usuario bloqueado', code: 400, valid: true };
			//
			else if (block > 2) throw { message: 'usuario bloqueado', code: 400 };
		}

		if (block > 2) throw { message: 'usuario bloqueado', code: 400 };
		else if (block < 3 && block > 0) {
			// validamos si esta bloqueado
			await getRepository(fm_worker)
				.createQueryBuilder()
				.update(fm_worker)
				.set({ block: 0 })
				.where('email = :email', { email })
				.execute();
		}

		//generamos token
		const token = jwt.sign({ id, type: 2, email }, key, { expiresIn: 60 * 30 });

		// Response
		Resp(req, res, {
			message: 'Usuario logeado con exito',
			info: { data: { ...data_user, roles } },
			token,
		});
	} catch (err: any) {
		if (err.valid) await block(email);
		next(err);
	}
};

// this function is for emit a mail for edit a password
export const passMail = async (
	req: Request<any, Api.Resp, fm_worker>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		// define email
		const { email } = req.body;
		// query for valid email
		const worker = await getRepository(fm_worker).findOne({ where: { email } });
		if (!worker) throw { message: `El correo ${email} no se encuentra registrado en la plataforma`, code: 400 };

		// emit mail
		await mail.newPass(worker);

		// Response
		res.status(200).json({ message: 'Le hemos enviado un correo electrónico para recuperar su contraseña' });
	} catch (err) {
		next(err);
	}
};

// editar usuarios
export const editPass = async (
	req: Request<Api.params, Api.Resp, fm_worker>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		// encript password
		const salt: string = await bcrypt.genSalt(10);
		req.body.password = await bcrypt.hash(`${req.body.password}`, salt);

		// define email
		const { password } = req.body;
		const { id }: any = req.headers.token;

		// query for valid email
		await getRepository(fm_worker)
			.createQueryBuilder()
			.update(fm_worker)
			.set({ password })
			.where('id = :id', { id })
			.execute();

		// Response
		res.status(200).json({ message: 'Contraseña actualizada con exito' });
	} catch (err) {
		next(err);
	}
};
