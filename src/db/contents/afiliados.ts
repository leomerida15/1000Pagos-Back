import { getRepository } from 'typeorm';
import fm_afiliados from '../models/fm_afiliados';

const afiliados = async (): Promise<void> => {
	const data: fm_afiliados[] = [
		{
			id: 720004108,
			id_type_person: 2,
			id_bank: 4,
			bank_account_number: '01040107160107199659',
			name: 'TRANRED ALIMENTO (BVC)',
		},
		{
			id: 720008172,
			id_type_person: 2,
			id_bank: 4,
			bank_account_number: '01040107160107199659',
			name: 'TRANRED BIENES Y SERVICIOS (BVC) ',
		},
		{
			id: 720008173,
			id_type_person: 2,
			id_bank: 4,
			bank_account_number: '01040107160107199659',
			name: 'TRANRED VESTIDO Y CALZADO (BVC)',
		},
		{
			id: 720008174,
			id_type_person: 2,
			id_bank: 4,
			bank_account_number: '01040107160107199659',
			name: 'TRANRED SIN FINES DE LUCRO (BVC)',
		},
		{
			id: 720008175,
			id_type_person: 2,
			id_bank: 4,
			bank_account_number: '01040107160107199659',
			name: 'TRANRED SALUD (BVC)',
		},
		{
			id: 720008176,
			id_type_person: 2,
			id_bank: 4,
			bank_account_number: '01040107160107199659',
			name: 'TRANRED SERVICIO PUBLICOS (BVC)',
		},
		{
			id: 720008177,
			id_type_person: 2,
			id_bank: 4,
			bank_account_number: '01040107160107199659',
			name: 'TRANRED EQUIPAMIENTO DEL HOGAR (BVC)',
		},
		{
			id: 720008178,
			id_type_person: 2,
			id_bank: 4,
			bank_account_number: '01040107160107199659',
			name: 'TRANRED EDUCACION (BVC)',
		},
		{
			id: 720008179,
			id_type_person: 2,
			id_bank: 4,
			bank_account_number: '01040107160107199659',
			name: 'TRANRED ENTRETENIMIENTO (BVC)',
		},
		{
			id: 722000030,
			id_type_person: 2,
			id_bank: 11,
			bank_account_number: '01380040560400009470',
			name: 'TRANRED BIENES Y SERVICIOS (BPLZA)',
		},
		{
			id: 722000031,
			id_type_person: 2,
			id_bank: 11,
			bank_account_number: '01380040560400009470',
			name: 'TRANRED ALIMENTO (BPLZA)',
		},
		{
			id: 722000032,
			id_type_person: 2,
			id_bank: 11,
			bank_account_number: '01380040560400009470',
			name: 'TRANRED VESTIDO Y CALZADO (BPLZA)',
		},
		{
			id: 722000033,
			id_type_person: 2,
			id_bank: 11,
			bank_account_number: '01380040560400009470',
			name: 'TRANRED SIN FINES DE LUCRO (BPLZA)',
		},
		{
			id: 722000034,
			id_type_person: 2,
			id_bank: 11,
			bank_account_number: '01380040560400009470',
			name: 'TRANRED SALUD (BPLZA)',
		},
		{
			id: 722000035,
			id_type_person: 2,
			id_bank: 11,
			bank_account_number: '01380040560400009470',
			name: 'TRANRED SERVICIO PUBLICOS (BPLZA)',
		},
		{
			id: 722000036,
			id_type_person: 2,
			id_bank: 11,
			bank_account_number: '01380040560400009470',
			name: 'TRANRED EQUIPAMIENT HOGAR (BPLZA)',
		},
		{
			id: 722000037,
			id_type_person: 2,
			id_bank: 11,
			bank_account_number: '01380040560400009470',
			name: 'TRANRED EDUCACION (BPLZA)',
		},
		{
			id: 722000038,
			id_type_person: 2,
			id_bank: 11,
			bank_account_number: '01380040560400009470',
			name: 'TRANRED BIENES Y SERVICIOS SUNTUARIO (BPLZA)',
		},
		{
			id: 722000039,
			id_type_person: 2,
			id_bank: 11,
			bank_account_number: '01380040560400009470',
			name: 'TRANRED ENTRETENIMIENTO (BPLZA)',
		},
	];

	//
	const valid = await getRepository(fm_afiliados).find({ where: data });
	if (!valid.length) await getRepository(fm_afiliados).save(data);
};

export default afiliados;
