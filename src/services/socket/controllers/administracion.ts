import fm_status from '../../../db/models/fm_status';
import { getConnection, getRepository, Any, Not } from 'typeorm';

export let administracion: any[] = [];
export let administracionTrabajndo: any[] = [];

export const listAdministracion = async () => {
	const query = await getConnection()
		.query(/*sql*/ `SELECT r.id ,r.code, cc.name as nameComer, c.name as nameClient, c.last_name as lastnameClient,
			c.email , i.name as identTypeComer, cc.ident_num as identNumComer , r.updatedAt
			FROM [MilPagos].[dbo].[fm_status]

			inner join fm_request as r on r.id = id_request
			inner join fm_client as c on c.id = r.id_client
			inner join fm_commerce as cc on cc.id = r.id_commerce
			inner join fm_ident_type as i on i.id = cc.id_ident_type

			where id_department = 7 and id_status_request = 1`);

	administracion = query;
	// diferidos = query.map((item) => item.id_request);

	return administracion;
};

export const listAdminisWorking = async (id_conectado: any, user: any, id_dife: any) => {
	if (administracion.length !== 0) {
		const obj = administracionTrabajndo.find((items) => {
			//// // console.log(`items.id_conectado === id_conectado`, items.id_conectado === id_conectado);
			return items.id_conectado === id_conectado;
		});
		if (obj) return obj;

		const i = administracion.findIndex((item) => {
			return item.id === id_dife;
		});
		if (i == -1) {
			return; // // console.log('MENOL NO EXISTE');
		}

		//// // console.log('Valor I', i);
		const resp = administracion[i];

		//// // console.log('DIferido', resp);

		administracion.splice(i, 1);

		administracionTrabajndo.unshift({ id_conectado, ...user, ...resp });

		return resp;
	}
};
