import fm_status from '../../../db/models/fm_status';

import { getConnection, getRepository, Any, In, Not } from 'typeorm';

export let administracion: any[] = [];
export let administracionTrabajndo: any[] = [];

export const listAdminisWorking = async (id_conectado: any, user: any, id_dife: any) => {
	if (administracion.length !== 1) {
		const obj = administracionTrabajndo.find((items) => {
			//// // console.log(`items.id_conectado === id_conectado`, items.id_conectado === id_conectado);
			return items.id_conectado === id_conectado || items.id === user.id;
		});
		if (obj) {
			administracionTrabajndo = administracionTrabajndo.filter((item) => {
				const { id_conectado, email, last_name, name, ...working } = item;

				administracion.unshift(working);

				return false;
			});
		}

		const i = administracion.findIndex((item) => {
			return item.id === id_dife;
		});
		if (i == -1) {
			return; // // console.log('MENOL NO EXISTE');
		}

		console.log('Valor I', i);
		const resp = administracion[i];

		console.log('Administracio', resp);

		administracion.splice(i, 1);

		administracionTrabajndo.unshift({ id_conectado, ...user, ...resp });

		console.log(administracionTrabajndo);

		return resp;
	}
};

export const disconectAdminis = (id_sockect: any) => {
	administracionTrabajndo = administracionTrabajndo.filter((item) => {
		if (item.id_conectado != id_sockect) return true;

		const { id_conectado, email, last_name, name, ...working } = item;

		administracion.unshift(working);

		return false;
	});

	// console.log('soy trabajando ', diferido);
};

export const disconectsolicAdministra = async (id_sockect: any) => {
	administracionTrabajndo = administracionTrabajndo.filter((item) => item.id_conectado != id_sockect);
};

export const getFmAdministration = async (): Promise<void> => {
	try {
		const query = await getRepository(fm_status).find({
			where: { id_department: 4, id_status_request: 3 },
			relations: ['id_request'],
		});

		if (!query.length) throw { message: 'no existen solicitudes en espera', code: 400 };

		const ids: any[] = query.map((item: any) => item.id_request.id);

		const query2 = await getRepository(fm_status).find({
			where: { id_request: In(ids), id_department: 7, id_status_request: 1 },
			relations: [
				'id_request',
				'id_request.id_commerce',
				'id_request.id_client',
				'id_request.rc_comp_dep',
				'id_request.id_payment_method',
				'id_request.id_type_payment',
			],
		});

		const info = query2;
		console.log('INformacion de query Administracion', info);

		if (!query2.length) throw { message: 'no existen solicitudes en espera', code: 400 };

		administracion = info;
	} catch (err) {
		console.log(err);
	}
};
