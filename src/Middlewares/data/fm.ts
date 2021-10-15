import { check, oneOf, ValidationChain } from 'express-validator';
import { NoSQL } from './index';
import fm_request from '../../db/models/fm_request';

export const validFmData: ValidationChain[] = [
	//
	check('rc_ref_bank', 'rc_ref_bank es requerido')
		.exists({ checkFalsy: true, checkNull: true })
		.isNumeric()
		.custom(NoSQL),
	//
	check('rc_comp_dep', 'rc_comp_dep es requerido')
		.exists({ checkFalsy: true, checkNull: true })
		.isNumeric()
		.custom(NoSQL),
	//
	check('rc_constitutive_act', 'rc_constitutive_act es requerido')
		.exists({ checkFalsy: true, checkNull: true })
		.isNumeric()
		.custom(NoSQL),
	//
	check('rc_ident_card', 'rc_ident_card es requerido')
		.exists({ checkFalsy: true, checkNull: true })
		.isNumeric()
		.custom(NoSQL),
	//
	check('rc_rif', 'rc_rif es requerido').exists({ checkFalsy: true, checkNull: true }).isNumeric().custom(NoSQL),
	//
	check('number_post', 'number_post es requerido')
		.exists({ checkFalsy: true, checkNull: true })
		.isNumeric()
		.custom(NoSQL),
	// validar la data del cliente
	//
	check('bank_account_num', 'bank_account_num invalido')
		.exists({ checkFalsy: true, checkNull: true })
		.isString()
		.custom(NoSQL),
	//
	check('id_payment_method', 'id_payment_method es requerido')
		.exists({ checkFalsy: true, checkNull: true })
		.isNumeric()
		.custom(NoSQL),
	//
	check('id_client', 'id_client es requerido')
		.exists({ checkFalsy: true, checkNull: true })
		.isNumeric()
		.custom(NoSQL),
	//
	check('id_commerce', 'id_commerce es requerido')
		.exists({ checkFalsy: true, checkNull: true })
		.isNumeric()
		.custom(NoSQL),
	//
	check('dir_pos', 'la dir_pos es obligatoria')
		.exists({ checkFalsy: true, checkNull: true })
		.isObject()
		.custom(NoSQL),
	//
	check('id_type_payment', 'id_type_payment es requerido')
		.exists({ checkFalsy: true, checkNull: true })
		.isNumeric()
		.custom(NoSQL),
	//
	check('id_request_origin', 'id_request_origin es requerido')
		.exists({ checkFalsy: true, checkNull: true })
		.isNumeric()
		.custom(NoSQL),
	//
	check('ci_referred', 'ci_referred es requerido')
		.exists({ checkFalsy: true, checkNull: true })
		.isNumeric()
		.custom(NoSQL),
];
