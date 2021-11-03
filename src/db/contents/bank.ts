import { getRepository } from 'typeorm';
import fm_bank from '../models/fm_bank';

const bank = async (): Promise<void> => {
	const data: fm_bank[] = [
		{ code: '0102', name: 'Banco de Venezuela S.A.C.ABanco Universal' },
		{ code: '0104', name: 'Venezolano de Crédito S.A.Banco Universal' },
		{ code: '0105', name: 'Banco Mercantil, C.A S.A.C.A.Banco Universal' },
		{ code: '0108', name: 'Banco Provincial, S.A.Banco Universal' },
		{ code: '0114', name: 'Bancaribe C.A.Banco Universal' },
		{ code: '0115', name: 'Banco Exterior C.A.Banco Universal' },
		{ code: '0116', name: 'Banco Occidental de Descuento, C.A.BOD Banco Universal' },
		{ code: '0128', name: 'Banco Caroní C.A.Banco Universal' },
		{ code: '0134', name: 'Banesco S.A.C.A.Banco Universal' },
		{ code: '0137', name: 'Banco Sofitasa C.A.Banco Universal' },
		{ code: '0138', name: 'Banco Plaza C.A.Banco Universal' },
		{ code: '0146', name: 'Banco de la Gente Emprendedora C.A.BangenteBanco Microfinanciero' },
		{ code: '0149', name: 'Banco del Pueblo Soberano, C.A.Banco de Desarrollo' },
		{ code: '0151', name: 'BFC Banco Fondo Común C.A.Banco Universal' },
		{ code: '0156', name: '100% Banco, C.A.Banco Universal' },
		{ code: '0157', name: 'DelSur, C.A.Banco Universal' },
		{ code: '0163', name: 'Banco del Tesoro, C.A.Banco Universal' },
		{ code: '0166', name: 'Banco Agrícola de Venezuela, C.ABanco Universal' },
		{ code: '0168', name: 'Bancrecer, S.A.Banco Microfinanciero' },
		{ code: '0169', name: 'Mi Banco C.A.Banco Microfinanciero' },
		{ code: '0171', name: 'Banco Activo, C.A.Banco Universal' },
		{ code: '0172', name: 'Bancamiga, C.A.Banco Microfinanciero' },
		{ code: '0173', name: 'Banco Internacional de Desarrollo, C.A.Banco Universal' },
		{ code: '0174', name: 'Banplus, C.A.Banco Universal' },
		{ code: '0175', name: 'Banco Bicentenario C.A.Banco Universal' },
		{ code: '0177', name: 'Banco de la Fuerza Armada Nacional BolivarianaBANFANBBanco Universal' },
		{ code: '0190', name: 'Citibank N.A.Banco Universal' },
		{ code: '0191', name: 'Banco Nacional de Crédito, C.A.Banco Universal' },
		{ code: '0601', name: 'Instituto Municipal de Crédito PopularInstitución Financiera' },
	];

	//
	const valid = await getRepository(fm_bank).find({ where: data });
	if (!valid.length) await getRepository(fm_bank).save(data);
};

export default bank;
