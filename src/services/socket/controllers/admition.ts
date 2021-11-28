import fm_status from '../../../db/models/fm_status';
import { getConnection, getRepository, Any, Not } from 'typeorm';

export let allSolic: number = 0;
export let allTerm: any = 0;
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

export const oneDIferido = async (id_request: any) => {
	// const query = await getConnection().query(
	// 	/*sql*/ `SELECT * FROM [MilPagos].[dbo].[fm_status] where id_department = 1 and id_status_request = 1`
	// );
	// if (diferido.length <= 5) {
	const query = await getRepository(fm_status).findOne({
		where: { id_request },
		relations: [
			'id_request',
			'id_request.id_client',
			'id_request.id_client.id_ident_type',
			'id_request.id_client.rc_ident_card',
			'id_request.id_commerce',
			'id_request.id_commerce.rc_constitutive_act',
			'id_request.id_commerce.rc_constitutive_act.id_photo',
			'id_request.id_commerce.rc_special_contributor',
			'id_request.id_commerce.rc_rif',
			'id_request.rc_ref_bank',
			'id_request.id_valid_request',
			'id_request.rc_comp_dep',
		],
	});

	if (!query) throw { message: 'no existen solicitudes en espera', code: 400 };

	diferidoTranbajando.push(query.id_request);

	return diferidoTranbajando;
	// }
};

export const listSolicWorking = async (id_conectado: any, user: any) => {
	if (solictudes.length <= 1) await listDiferido();
	if (solictudes.length !== 0) {
		const obj = solictudesTrabajando.find((items) => {
			console.log(`items.id_conectado === id_conectado`, items.id_conectado === id_conectado);

			return items.id_conectado === id_conectado;
		});
		if (obj) return obj;

		// console.log('solictudes.length', solictudes.length);

		const working = solictudes.shift();

		// console.log('solictudes pos', solictudes[0]);

		// solictudesTrabajando.unshift(working);
		solictudesTrabajando.unshift({ id_conectado, ...user, ...working });
		// const obj2 = solictudesTrabajando.find((items) => items.id_conectado === id_conectado);
		// console.log('Jisus este es el que pao', working);
		return working;
	}
	return solictudes;
};

export const listDiferidoWorking = async (id_conectado: any, user: any, id_dife: any) => {
	if (diferido.length !== 0) {
		const obj = diferidoTranbajando.find((items) => {
			// console.log(`items.id_conectado === id_conectado`, items.id_conectado === id_conectado);

			return items.id_conectado === id_conectado;
		});
		if (obj) return obj;

		const i = diferido.findIndex((item) => {
			return item.id === id_dife;
		});
		if (i == -1) {
			return console.log('MENOL NO EXISTE');
		}
		// const working2 = diferido.find((item) => {
		// 	return item.id === id_dife;
		// });

		// console.log('Valor I', i);
		const resp = diferido[i];

		// console.log('DIferido', resp);

		diferido.splice(i, 1);

		// console.log('Lista de Diferidos', diferido);

		// diferidoTranbajando.unshift({ id_conectado, ...user, ...working2 });
		diferidoTranbajando.unshift({ id_conectado, ...user, ...resp });

		return resp;
	}
};

export const disconect = (id_sockect: any) => {
	// console.log('antes del filter ', solictudesTrabajando.length);
	// console.log('solictudes', solictudes.length);
	// console.log('solictudesTrabajando', solictudesTrabajando);

	solictudesTrabajando = solictudesTrabajando.filter((item) => {
		if (item.id_conectado != id_sockect) return true;

		const { id_conectado, email, last_name, name, ...working } = item;

		solictudes.unshift(working);
		// console.log('SOlicitud Trabjando', solictudesTrabajando);
		return false;
	});

	diferidoTranbajando = diferidoTranbajando.filter((item) => {
		if (item.id_conectado != id_sockect) return true;

		const { id_conectado, email, last_name, name, ...working2 } = item;

		diferido.unshift(working2);
		return false;
	});

	// listDiferido();

	// All_Info();

	// getDash();

	// console.log('ARMANDO ESTAS AQUI');
};

export const disconectsolic = async (id_sockect: any) => {
	solictudesTrabajando = solictudesTrabajando.filter((item) => {
		if (item.id_conectado != id_sockect) return true;

		const { id_conectado, email, last_name, name, ...working } = item;

		// solictudes.unshift(working);
		// console.log('SOlicitud Trabjando', solictudesTrabajando);
		return false;
	});

	diferidoTranbajando = diferidoTranbajando.filter((item) => {
		if (item.id_conectado != id_sockect) return true;

		const { id_conectado, email, last_name, name, ...working2 } = item;

		// diferido.unshift(working2);
		return false;
	});

	// await listDiferido();

	// await All_Info();

	// await getDash();
};

export const listSolic = async () => {
	// const query = await getConnection().query(
	// 	/*sql*/ `SELECT * FROM [MilPagos].[dbo].[fm_status] where id_department = 1 and id_status_request = 1`
	// );

	let ids = [
		...solictudes.map((solictude) => solictude.id),
		...solictudesTrabajando.map((solictude) => solictude.id),
	];

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
			'id_request.id_client.rc_ident_card',
			'id_request.id_client.id_ident_type',
			//
			'id_request.id_valid_request',
			'id_request.dir_pos',
			'id_request.dir_pos.id_location',
			'id_request.dir_pos.id_location.id_estado',
			'id_request.dir_pos.id_location.id_municipio',
			'id_request.dir_pos.id_location.id_ciudad',
			'id_request.dir_pos.id_location.id_parroquia',
			//
			'id_request.id_commerce',
			'id_request.id_commerce.id_ident_type',
			'id_request.id_commerce.id_activity',
			'id_request.id_commerce.id_location',
			'id_request.id_commerce.id_location.id_estado',
			'id_request.id_commerce.id_location.id_municipio',
			'id_request.id_commerce.id_location.id_ciudad',
			'id_request.id_commerce.id_location.id_parroquia',
			'id_request.id_commerce.banks',
			'id_request.id_commerce.rc_constitutive_act',
			'id_request.id_commerce.rc_constitutive_act.id_photo',
			'id_request.id_commerce.rc_rif',
			'id_request.id_commerce.rc_special_contributor',
			//
			'id_request.id_product',
			'id_request.id_type_request',
			'id_request.id_request_origin',
			//
			'id_request.rc_ref_bank',
			'id_request.rc_comp_dep',
			'id_request.id_payment_method',
			'id_request.id_type_payment',
		],
	});

	if (!query) throw { message: 'no existen solicitudes en espera', code: 400 };

	const info: any = query.map((item) => item.id_request);

	solictudes = info;
	// diferidos = query.map((item) => item.id_request);

	return solictudes;
};

export const getDiferido = async (id_request: number) => {
	let query: any = await getRepository(fm_status).findOne({
		where: { id_request },
		relations: [
			'id_request',
			'id_request.id_valid_request',
			'id_request.id_commerce',
			'id_request.id_commerce.rc_constitutive_act',
			'id_request.id_commerce.rc_constitutive_act.id_photo',
			'id_request.id_commerce.rc_rif',
			'id_request.id_commerce.rc_special_contributor',
			'id_request.id_client',
			'id_request.id_client.rc_ident_card',
			'id_request.rc_ref_bank',
			'id_request.rc_comp_dep',
		],
	});

	if (!query) throw { message: 'el id soministrado no extie', code: 400 };

	// console.log('query', query);

	let id_valid_request: any = {};
	Object.keys(query.id_request.id_valid_request)
		.filter((key) => {
			return query.id_request.id_valid_request[key].length;
		})
		.forEach((key) => (id_valid_request[key] = query.id_request.id_valid_request[key]));

	const { id_commerce, id_client, rc_ref_bank, rc_comp_dep }: any = query.id_request;
	console.log('id_commerce', id_commerce);

	const { rc_special_contributor, rc_constitutive_act, rc_rif }: any = id_commerce;
	const { rc_ident_card }: any = id_client;

	let imgs: any = {};

	const data: any = {
		rc_special_contributor,
		rc_constitutive_act,
		rc_rif,
		rc_ident_card,
		rc_ref_bank,
		rc_comp_dep,
	};
	Object.keys(id_valid_request)
		.map((valid) => valid.replace('valid_', 'rc_'))
		.forEach((key) => (imgs[key] = data[key]));

	const resp = {
		...imgs,
		id_valid_request,
	};

	// console.log('resp', resp);

	return resp;
};

export const getDash = () => ({
	solictudes: solictudes.length,
	solictudesTrabajando: solictudesTrabajando.length,
	diferidos: diferido.length,
	diferidosTranbajando: diferidoTranbajando.length,
});

export const All_Info = async () => {
	//Count solicitudes
	let solicitudes = await getRepository(fm_status).count({
		where: { id_status_request: 1, id_department: 4 },
	});

	//Count Terminas todo lo que salio de admision
	let terminadas: any = await getRepository(fm_status).count({
		where: { id_status_request: 3, id_department: 4 },
	});

	//count diferidos
	let diferidos: any = await getRepository(fm_status).count({
		where: { id_status_request: 4, id_department: 4 },
	});

	allSolic = solicitudes;
	allTerm = terminadas;

	const total = { allSolic, allTerm, diferidos };

	// console.log(total);

	return total;
};
