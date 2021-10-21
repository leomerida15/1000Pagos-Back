import { check, oneOf, ValidationChain } from 'express-validator';
import { NoSQL } from './index';
import fm_request from '../../db/models/fm_request';

export const validFmData: ValidationChain[] = [
	//
	check('rc_ref_bank', 'rc_ref_bank es requerido').isNumeric().custom(NoSQL),
	//
	check('rc_ident_card', 'rc_ident_card es requerido').isNumeric().custom(NoSQL),
	//
	check('rc_rif', 'rc_rif es requerido').isNumeric().custom(NoSQL),
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
