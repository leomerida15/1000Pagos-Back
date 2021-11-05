import fm_status from '../../../db/models/fm_status';
import { getConnection, getRepository } from 'typeorm';

export let diferido: any[] = [];
export let diferidoTranbajando: any[] = [];
export let solictudes: any[] = [];
export let solictudesTrabajando: any[] = [];

export const listDiferido = async () => {
	const query = await getConnection()
		.query(/*sql*/ `SELECT r.id ,r.code, cc.name as nameComer, c.name as nameClient, c.last_name as lastnameClient, c.email , i.name as identTypeComer, cc.ident_num as identNumComer , r.updatedAt
			FROM [MilPagos].[dbo].[fm_status]

			inner join fm_request as r on r.id = id_request
			inner join fm_client as c on c.id = r.id_client
			inner join fm_commerce as cc on cc.id = r.id_commerce
			inner join fm_ident_type as i on i.id = cc.id_ident_type

			where id_department = 1 and id_status_request = 4`);

	diferido = query;
	// diferidos = query.map((item) => item.id_request);

	return diferido;
};

export const listSolic = async (socket: any) => {
	// const query = await getConnection().query(
	// 	/*sql*/ `SELECT * FROM [MilPagos].[dbo].[fm_status] where id_department = 1 and id_status_request = 1`
	// );
	if (diferido.length <= 5) {
		const query = await getRepository(fm_status).find({
			where: { id_status_request: 1, id_department: 1 },
			take: 10,
			order: {
				id: 'ASC',
			},
			relations: [
				'id_request',
				'id_request.id_client',
				'id_request.id_client.id_location',
				'id_request.id_client.id_location.id_estado',
				'id_request.id_client.id_location.id_municipio',
				'id_request.id_client.id_location.id_ciudad',
				'id_request.id_client.id_location.id_parroquia',
				'id_request.id_client.id_ident_type',
				'id_request.id_valid_request',
				'id_request.dir_pos',
				'id_request.dir_pos.id_location',
				'id_request.rc_constitutive_act',
				'id_request.rc_special_contributor',
				'id_request.rc_ref_bank',
				'id_request.rc_comp_dep',
				'id_request.rc_rif',
				'id_request.rc_ident_card',
				'id_request.id_payment_method',
				'id_request.id_type_payment',
				'id_request.id_commerce',
				'id_request.id_commerce.id_ident_type',
				'id_request.id_commerce.id_activity',
				'id_request.id_commerce.id_location',
				'id_request.id_commerce.id_location.id_estado',
				'id_request.id_commerce.id_location.id_municipio',
				'id_request.id_commerce.id_location.id_ciudad',
				'id_request.id_commerce.id_location.id_parroquia',
				'id_request.id_commerce.banks',
				'id_request.id_product',
				'id_request.id_type_request',
				'id_request.id_request_origin',
			],
		});

		if (!query) throw { message: 'no existen solicitudes en espera', code: 400 };

		const info: any = query.map((item) => item.id_request);

		solictudes = info;
		// diferidos = query.map((item) => item.id_request);

		return solictudes;
	}
};

export const listSolicWorking = (id_conectado: any, user: any) => {
	if (solictudes.length !== 0) {
		const working = solictudes.shift();

		solictudesTrabajando.push({ id_conectado, ...user, working });

		// console.log(solictudesTrabajando);
		return solictudesTrabajando;
	}
};

export const disconect = (id_sockect: any) => {
	solictudesTrabajando = solictudesTrabajando.filter((item) => {
		console.log('item.id_conectado != id_sockect');
		console.log(`${item.id_conectado} != ${id_sockect}`);
		console.log(item.id_conectado != id_sockect);

		return item.id_conectado != id_sockect;
	});

	console.log(solictudesTrabajando.length);
};
