import fm_ident_type from '../models/fm_ident_type';
import { getRepository } from 'typeorm';
import fm_estado from '../models/fm_estado';

const estado = async (): Promise<void> => {
	const data: fm_estado[] = [
		{ id: 1, estado: 'Amazonas', iso_3166: 'VE-X' },
		{ id: 2, estado: 'Anzoátegui', iso_3166: 'VE-B' },
		{ id: 3, estado: 'Apure', iso_3166: 'VE-C' },
		{ id: 4, estado: 'Aragua', iso_3166: 'VE-D' },
		{ id: 5, estado: 'Barinas', iso_3166: 'VE-E' },
		{ id: 6, estado: 'Bolívar', iso_3166: 'VE-F' },
		{ id: 7, estado: 'Carabobo', iso_3166: 'VE-G' },
		{ id: 8, estado: 'Cojedes', iso_3166: 'VE-H' },
		{ id: 9, estado: 'Delta Amacuro', iso_3166: 'VE-Y' },
		{ id: 10, estado: 'Falcón', iso_3166: 'VE-I' },
		{ id: 11, estado: 'Guárico', iso_3166: 'VE-J' },
		{ id: 12, estado: 'Lara', iso_3166: 'VE-K' },
		{ id: 13, estado: 'Mérida', iso_3166: 'VE-L' },
		{ id: 14, estado: 'Miranda', iso_3166: 'VE-M' },
		{ id: 15, estado: 'Monagas', iso_3166: 'VE-N' },
		{ id: 16, estado: 'Nueva Esparta', iso_3166: 'VE-O' },
		{ id: 17, estado: 'Portuguesa', iso_3166: 'VE-P' },
		{ id: 18, estado: 'Sucre', iso_3166: 'VE-R' },
		{ id: 19, estado: 'Táchira', iso_3166: 'VE-S' },
		{ id: 20, estado: 'Trujillo', iso_3166: 'VE-T' },
		{ id: 21, estado: 'La Guaira', iso_3166: 'VE-W' },
		{ id: 22, estado: 'Yaracuy', iso_3166: 'VE-U' },
		{ id: 23, estado: 'Zulia', iso_3166: 'VE-V' },
		{ id: 24, estado: 'Distrito Capital', iso_3166: 'VE-A' },
		{ id: 25, estado: 'Dependencias Federales', iso_3166: 'VE-Z' },
	];
	//
	const valid = await getRepository(fm_estado).find({ where: data });
	if (!valid.length) await getRepository(fm_estado).save(data);
};

export default estado;
