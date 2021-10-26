// modules
import nodemailer, { SendMailOptions } from 'nodemailer';
import jwt from 'jsonwebtoken';
import mailMsg from './messages';
import Mail from 'nodemailer/lib/mailer';
import fm_worker from '../../db/models/fm_worker';
import fm_client from '../../db/models/fm_client';
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
export const verify = async (info: fm_client) => {
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
