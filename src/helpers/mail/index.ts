// modules
import nodemailer, { SendMailOptions } from 'nodemailer';
import jwt from 'jsonwebtoken';
import mailMsg, { digeridosMSG } from './messages';
import { mail } from '../../helpers';
import fm_worker from '../../db/models/fm_worker';
import fm_client from '../../db/models/fm_client';
import fm_request from 'db/models/fm_request';
import Mail from 'nodemailer/lib/mailer';
const key: string = process.env.KEY || '_secreto';

/** define mailOptions */
const prod = process.argv[0] === '/root/.nvm/versions/node/v14.15.0/bin/node';
const URL_WEB = prod ? `http://localhost:8080` : `http://localhost:8080`;
const from = 'proyecto.z.alpha@gmail.com';
const subject = 'latam-node';

/** create conection with email */
const mailer: Mail = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'go.code.go.pruebas@gmail.com',
		pass: 'ontlfxpnjagolnml',
	},
});

// this mail is for verify the email a user
export const verify = async (info: fm_client | fm_worker) => {
	try {
		/** define vars */
		const { name, last_name, email, id } = info;
		const token = jwt.sign({ id }, key, { expiresIn: '1 day' });
		const link = `${URL_WEB}/verify/${token}`;
		const to = `${email}`;
		const subject: string = 'Bienvenido a 1000Pagos';

		/** Define conten of message */
		const html = mailMsg(link, 'Verificar mi correo', name, last_name);

		/** options of email */
		const mailOptions: SendMailOptions = { from, to, subject, html };

		/** Shipping email */
		await mailer.sendMail(mailOptions);

		return html;
	} catch (err) {
		console.log(err);
	}
};

// this mail is for valid edition of a password
export const newPass = async (info: fm_worker | fm_client) => {
	try {
		/** define vars */
		const { name, email, id, last_name } = info;
		const token = jwt.sign({ id }, key, { expiresIn: '1 day' });
		const link = `${URL_WEB}/newPass/${token}`;
		const to = `${email}`;

		/** Define conten of message */
		const html = mailMsg(link, 'Para editar tu password haga click en el siguiente link', name, last_name);

		/** options of email */
		const mailOptions: SendMailOptions = { from, to, subject, html };

		/** Shipping email */
		await mailer.sendMail(mailOptions);
	} catch (err) {
		console.log(err);
	}
};

// this mail is for valid edition of a password
export const diferido = async (info: fm_request) => {
	try {
		/** define vars */
		const { code, id_client, id_valid_request }: any = info;
		const { email, name, last_name } = id_client;
		const to = `${email}`;
		const subject = `[${code}]-dif`;
		const msg = Object.keys(info)
			.filter((key) => key != 'id')
			.map(
				(key) => /*html*/ `
				${key}: ${id_valid_request[key]}
				`
			)
			.join('<br/>');

		const html = digeridosMSG(msg, name, last_name);

		/** Define conten of message */

		/** options of email */
		const mailOptions: SendMailOptions = { from, to, subject, html };

		/** Shipping email */
		await mailer.sendMail(mailOptions);
	} catch (err) {
		console.log(err);
	}
};
