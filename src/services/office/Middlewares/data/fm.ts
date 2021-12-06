import { check, ValidationChain } from 'express-validator';
import { NoSQL } from './index';

export const validFmData: ValidationChain[] = [
	//
	check('rc_ref_bank', 'la referencia bancaria es requerido').isNumeric().custom(NoSQL),
	//
	check('rc_ident_card', 'el rc_ident_card es requerido').isNumeric().custom(NoSQL),
	//
	check('rc_rif', 'rif es requerido').isNumeric().custom(NoSQL),
	//
	check('number_post', 'number_post es requerido').isNumeric().custom(NoSQL),
	// validar la data del cliente
	//
	check('bank_account_num', 'bank_account_num invalido').isString().custom(NoSQL),
	//
	check('id_client', 'id_client es requerido').isNumeric().custom(NoSQL),
	//
	check('id_product', 'id_product es requerido').isNumeric().custom(NoSQL),
	//
	check('id_commerce', 'id_commerce es requerido').isNumeric().custom(NoSQL),
	//
	check('dir_pos', 'la dir_pos es obligatoria').isObject().custom(NoSQL),
	//
	check('id_type_payment', 'id_type_payment es requerido').isNumeric().custom(NoSQL),
	//
	check('id_payment_method', 'id_payment_method es requerido').isNumeric().custom(NoSQL),
	//
	check('id_request_origin', 'id_request_origin es requerido').isNumeric().custom(NoSQL),
];
