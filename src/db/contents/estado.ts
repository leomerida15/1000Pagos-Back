import { getRepository } from 'typeorm';
import fm_estado from '../models/fm_estado';

const estado = async (): Promise<void> => {
	const data: fm_estado[] = [
		{ id: 1, estado: 'Distrito Capital', iso_3166: 'VE-A' },
		{ id: 2, estado: 'Amazonas', iso_3166: 'VE-X' },
		{ id: 3, estado: 'Anzoátegui', iso_3166: 'VE-B' },
		{ id: 4, estado: 'Apure', iso_3166: 'VE-C' },
		{ id: 5, estado: 'Aragua', iso_3166: 'VE-D' },
		{ id: 6, estado: 'Barinas', iso_3166: 'VE-E' },
		{ id: 7, estado: 'Miranda', iso_3166: 'VE-M' },
		{ id: 8, estado: 'Carabobo', iso_3166: 'VE-G' },
		{ id: 9, estado: 'Cojedes', iso_3166: 'VE-H' },
		{ id: 10, estado: 'Delta Amacuro', iso_3166: 'VE-Y' },
		{ id: 11, estado: 'Falcón', iso_3166: 'VE-I' },
		{ id: 12, estado: 'Guárico', iso_3166: 'VE-J' },
		{ id: 13, estado: 'Lara', iso_3166: 'VE-K' },
		{ id: 14, estado: 'Bolívar', iso_3166: 'VE-F' },
		{ id: 15, estado: 'Monagas', iso_3166: 'VE-N' },
		{ id: 16, estado: 'Mérida', iso_3166: 'VE-L' },
		{ id: 17, estado: 'Nueva Esparta', iso_3166: 'VE-O' },
		{ id: 18, estado: 'Portuguesa', iso_3166: 'VE-P' },
		{ id: 19, estado: 'Sucre', iso_3166: 'VE-R' },
		{ id: 20, estado: 'Táchira', iso_3166: 'VE-S' },
		{ id: 21, estado: 'Trujillo', iso_3166: 'VE-T' },
		{ id: 22, estado: 'Yaracuy', iso_3166: 'VE-U' },
		{ id: 23, estado: 'Zulia', iso_3166: 'VE-V' },
		{ id: 24, estado: 'La Guaira', iso_3166: 'VE-W' },
		{ id: 25, estado: 'Dependencias Federales', iso_3166: 'VE-Z' },
	];
	//
	const valid = await getRepository(fm_estado).find({ where: data });
	if (!valid.length) await getRepository(fm_estado).save(data);
};

export default estado;
