import { check, oneOf, ValidationChain } from 'express-validator';
import { NoSQL } from './index';

export const RegisterData: ValidationChain[] = [
	//
	check('name', 'nombre invalido').exists({ checkFalsy: true, checkNull: true }).isAlpha().custom(NoSQL),
	//
	check(
		'password',
		'la contraseña debe tener 1 numero, 1 minuscula, 1 mayuscula, 1 simbolo y un minimo de 6 caracteres'
	)
		.exists({ checkFalsy: true, checkNull: false })
		.isStrongPassword({ minLength: 6, minNumbers: 1, minLowercase: 1, minUppercase: 1, minSymbols: 1 })
		.custom(NoSQL),
	//
	check('nro_ident', 'el numero de documento de identidad no es valido')
		.exists({ checkFalsy: true, checkNull: true })
		.isLength({ min: 6, max: 10 })
		.isString()
		.custom(NoSQL),
	//
	check('email', 'el correo no es valido').exists({ checkFalsy: true, checkNull: true }).isEmail().custom(NoSQL),
];
