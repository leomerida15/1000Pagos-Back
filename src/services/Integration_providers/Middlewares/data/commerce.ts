import { check, oneOf, ValidationChain } from 'express-validator';
import { NoSQL } from './index';

export const CreateCommerceData: ValidationChain[] = [
	//
	check('id_fm', 'nombre invalido').exists({ checkFalsy: true, checkNull: true }).isNumeric().custom(NoSQL),
	//
	check('id_commerce', 'nombre invalido').exists({ checkFalsy: true, checkNull: true }).isNumeric().custom(NoSQL),
	//
	check('id_client', 'nombre invalido').exists({ checkFalsy: true, checkNull: true }).isNumeric().custom(NoSQL),
	//
];
