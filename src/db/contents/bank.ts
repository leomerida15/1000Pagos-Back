import { getRepository } from 'typeorm';
import fm_bank from '../models/fm_bank';

const bank = async (): Promise<void> => {
	const data: fm_bank[] = [
		{ code: '0102', name: 'Banco de Venezuela S.A.C.A Banco Universal', alias: 'Banco de Venezuela' },
		{ code: '0104', name: 'Venezolano de Crédito S.A.Banco Universal', alias: 'Venezolano de Crédito' },
		{ code: '0105', name: 'Banco Mercantil, C.A S.A.C.A.Banco Universal', alias: 'Mercantil' },
		{ code: '0108', name: 'Banco Provincial, S.A.Banco Universal', alias: 'Provincial' },
		{ code: '0114', name: 'Bancaribe C.A.Banco Universal', alias: 'Bancaribe' },
		{ code: '0115', name: 'Banco Exterior C.A.Banco Universal', alias: 'Exterior' },
		{ code: '0116', name: 'Banco Occidental de Descuento, C.A.BOD Banco Universal', alias: 'BOD' },
		{ code: '0128', name: 'Banco Caroní C.A.Banco Universal', alias: 'Caroní' },
		{ code: '0134', name: 'Banesco S.A.C.A.Banco Universal', alias: 'Banesco' },
		{ code: '0137', name: 'Banco Sofitasa C.A.Banco Universal', alias: 'Sofitasa' },
		{ code: '0138', name: 'Banco Plaza C.A.Banco Universal', alias: 'Banco Plaza' },
		{
			code: '0146',
			name: 'Banco de la Gente Emprendedora C.A.BangenteBanco Microfinanciero',
			alias: 'Gente Emprendedora',
		},
		{ code: '0149', name: 'Banco del Pueblo Soberano, C.A.Banco de Desarrollo', alias: 'Banco del Pueblo' },
		{ code: '0151', name: 'BFC Banco Fondo Común C.A.Banco Universal', alias: 'BFC' },
		{ code: '0156', name: '100% Banco, C.A.Banco Universal', alias: '100% Banco' },
		{ code: '0157', name: 'DelSur, C.A.Banco Universal', alias: 'DelSur' },
		{ code: '0163', name: 'Banco del Tesoro, C.A.Banco Universal', alias: 'del Tesoro' },
		{ code: '0166', name: 'Banco Agrícola de Venezuela, C.ABanco Universal', alias: 'Agrícola de Venezuela' },
		{ code: '0168', name: 'Bancrecer, S.A.Banco Microfinanciero', alias: 'Bancrecer' },
		{ code: '0169', name: 'Mi Banco C.A.Banco Microfinanciero', alias: 'Mi Banco' },
		{ code: '0171', name: 'Banco Activo, C.A.Banco Universal', alias: 'Activo' },
		{ code: '0172', name: 'Bancamiga, C.A.Banco Microfinanciero', alias: 'Bancamiga' },
		{
			code: '0173',
			name: 'Banco Internacional de Desarrollo, C.A.Banco Universal',
			alias: 'Internacional de Desarrollo',
		},
		{ code: '0174', name: 'Banplus, C.A.Banco Universal', alias: 'BanPlus' },
		{ code: '0175', name: 'Banco Bicentenario C.A.Banco Universal', alias: 'Bicentenario' },
		{
			code: '0177',
			name: 'Banco de la Fuerza Armada Nacional BolivarianaBANFANBBanco Universal',
			alias: 'BAMFANB',
		},
		{ code: '0190', name: 'Citibank N.A.Banco Universal', alias: 'CitiBank' },
		{ code: '0191', name: 'Banco Nacional de Crédito, C.A.Banco Universal', alias: 'BNC' },
		{
			code: '0601',
			name: 'Instituto Municipal de Crédito PopularInstitución Financiera',
			alias: 'Instituto Municipal de Crédito Popular',
		},
	];

	//
	const valid = await getRepository(fm_bank).find({ where: data });
	if (!valid.length) await getRepository(fm_bank).save(data);
};

export default bank;
