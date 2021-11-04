import { getConnection } from 'typeorm';

export let diferido = [];
export let diferidoTranbajando = [];
export let solictudes = [];
export let solictudesTrabajando = [];
export const listDiferido = async () => {
	const query = await getConnection().query(
		/*sql*/ `SELECT * FROM [MilPagos].[dbo].[fm_status] where id_department = 1 and id_status_request = 4`
	);

	diferido = query;
	// diferidos = query.map((item) => item.id_request);

	return diferido;
};

export const listSolic = async () => {
	const query = await getConnection().query(
		/*sql*/ `SELECT * FROM [MilPagos].[dbo].[fm_status] where id_department = 1 and id_status_request = 1`
	);

	solictudes = query;
	// diferidos = query.map((item) => item.id_request);

	return solictudes;
};
