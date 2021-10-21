import { check, oneOf, ValidationChain } from 'express-validator';
import { NoSQL } from './index';

export const validCommerceData: ValidationChain[] = [
	//
	check('name', 'nombre invalido').exists({ checkFalsy: true, checkNull: true }).isString().custom(NoSQL),
	//
	check('id_ident_type', 'el tipo de documento de identidad no es valido')
		.exists({ checkFalsy: true, checkNull: true })
		.isNumeric({ no_symbols: true })
		.custom(NoSQL),
	//
	check('ident_num', 'numero de identidad invalido')
		.exists({ checkFalsy: true, checkNull: true })
		.isString()
		.custom(NoSQL),
	//
	check('special_contributor', 'defina si es contribuidor especial').isNumeric().custom(NoSQL),
	//
	check('id_activity', 'Tipo de actividad comercial invalido')
		.exists({ checkFalsy: true, checkNull: true })
		.isNumeric()
		.custom(NoSQL),
	//
	check('location', 'la locacion es obligatoria')
		.exists({ checkFalsy: true, checkNull: true })
		.isObject()
		.custom(NoSQL),
];
