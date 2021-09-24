import ident_type from './ident_type';
import payment_method from './payment_method';
import roles from './roles';
import worker from './worker';
import activity from './activity';
import Product from './product';
import estado from './estado';
import municipio from './municipio';
import parroquia from './parroquia';
import ciudad from './ciudad';
import company from './company';
import department from './department';
import client from './client';
<<<<<<< HEAD
import status_request from './status_request';
import type_request from './type_request';
import bank from './bank';
=======

>>>>>>> c0ecb9b106222750e375be87c02ebcb21d6f32cd

export default async () => {
	await status_request();
	await type_request();
	await ident_type();
	await roles();
	await payment_method();
	await company();
	await department();
	await worker();
	await client();
	await activity();
	await Product();
	await estado();
	await municipio();
	await parroquia();
	await ciudad();
<<<<<<< HEAD
	await bank();
=======

>>>>>>> c0ecb9b106222750e375be87c02ebcb21d6f32cd
};
