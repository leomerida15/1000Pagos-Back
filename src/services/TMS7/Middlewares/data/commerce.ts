import { check, oneOf, ValidationChain } from 'express-validator';
import { NoSQL } from './index';

export const ProductData: ValidationChain[] = [
	//
	check('name', 'nombre invalido').exists({ checkFalsy: true, checkNull: true }).isAlpha().custom(NoSQL),
	//
	check('id_ident_type', 'el tipo de documento de identidad no es valido')
		.exists({ checkFalsy: true, checkNull: true })
		.isNumeric({ no_symbols: true })
		.isIn([2, 3])
		.custom(NoSQL),
	//
	check('ident_num', 'numero de identidad invalido')
		.exists({ checkFalsy: true, checkNull: true })
		.isString()
		.custom(NoSQL),
	//
	check('special_contributor', 'defina si es contribuidor especial')
		.exists({ checkFalsy: true, checkNull: true })
		.isBoolean()
		.custom(NoSQL),
	//
	check('id_activity', 'Tipo de actividad comercial invalido')
		.exists({ checkFalsy: true, checkNull: true })
		.isNumeric()
		.custom(NoSQL),
	//
	check('id_location', 'la locacion es obligatoria')
		.exists({ checkFalsy: true, checkNull: true })
		.isNumeric()
		.custom(NoSQL),
];
