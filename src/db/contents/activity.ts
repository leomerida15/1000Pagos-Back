import Log from 'hooks/logs';
import { getRepository } from 'typeorm';
import fm_worker from '../models/fm_worker';
import fm_activity from '../models/fm_activity';

const activity = async (): Promise<void> => {
	const data: fm_activity[] = [
		{ id: 4225, name: 'Servicios Publico' },
		{ id: 4723, name: 'Ventas Paquetes Turísticos' },
		{ id: 4789, name: 'Servicio de Transporte' },
		{ id: 5200, name: 'Equipamient Hogar ' },
		{ id: 5331, name: 'Tiendas de Variedades' },
		{ id: 5411, name: 'Supermercados' },
		{ id: 5462, name: 'Panadería y Pastelería' },
		{
			id: 5531,
			name: 'Tienda de Repuesto de Automóviles',
		},
		{ id: 5541, name: 'Estaciones de Servicios' },
		{ id: 5661, name: 'Zapatería' },
		{ id: 5691, name: 'Tienda Ropa Masculina y Femenina' },
		{ id: 5812, name: 'Restaurante y Fuentes de Soda' },
		{ id: 5813, name: 'Bienes y Serv Suntuarios' },
		{ id: 5814, name: 'Restaurants de Comida Rápida' },
		{ id: 5912, name: 'Farmacias y Droguerías' },
		{ id: 5921, name: 'Licorerías' },
		{ id: 5941, name: 'Tiendas Artículos Deportivos' },
		{ id: 5994, name: 'Kioskos y Tiendas de Cigarrillos' },
		{
			id: 5999,
			name: 'Detal Artículos Especiales Varios',
		},
		{
			id: 7230,
			name: 'Peluquería, Barbería y Salón de Belleza',
		},
		{ id: 7832, name: 'Entretenimiento' },
		{ id: 7999, name: 'Concesionarios Clubes Privados' },
		{ id: 8011, name: 'Doctores y Medicos' },
		{ id: 8021, name: 'Dentista y Ortodonsista' },
		{ id: 8099, name: 'Servicios Médicos' },
		{ id: 8111, name: 'Servicios Legales (Abogados)' },
		{ id: 8211, name: 'Escuelas y Colegios' },
		{ id: 8398, name: 'Sin Fines de Lucro' },
		{ id: 9311, name: 'Pagos de Impuestos' },
	];

	//
	const valid = await getRepository(fm_activity).find({ where: data });
	if (!valid.length) await getRepository(fm_activity).save(data);
};

export default activity;
