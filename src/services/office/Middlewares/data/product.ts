import { check, oneOf, ValidationChain } from 'express-validator';
import { NoSQL } from './index';

export const ProductData: ValidationChain[] = [
	//
	check('name', 'nombre invalido').exists({ checkFalsy: true, checkNull: true }).isAlpha().custom(NoSQL),
	//
	check('id_ident_type', 'el tipo de documento de identidad no es valido')
		.exists({ checkFalsy: true, checkNull: true })
		.isNumeric({ no_symbols: true })
		.custom(NoSQL),
	//
	check('description', 'descriccion vacia').exists({ checkFalsy: true, checkNull: true }).isString().custom(NoSQL),
	//
	check('price', 'precio invalido').exists({ checkFalsy: true, checkNull: true }).isFloat().custom(NoSQL),
	//
	check('fm_payment_method', 'forma de pago invlida').isNumeric().isIn([1, 2, 3]).custom(NoSQL),
];
