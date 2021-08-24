import KeysQuey from './querys';

export default (sql: any) => {
	KeysQuey(sql, [
		{
			dad: 'fm_bank_commerce',
			fks: [
				{ boy: 'fm_commerce', key: 'id_commerce' },
				{ boy: 'fm_bank', key: 'id_bank' },
			],
		},
		{
			dad: 'fm_ciudades',
			fks: [{ boy: 'fm_estados', key: 'id_estado' }],
		},
		{
			dad: 'fm_cod_postal',
			fks: [{ boy: 'fm_parroquias', key: 'id_parroquia' }],
		},
		{
			dad: 'fm_commerce',
			fks: [
				{ boy: 'fm_ident_type', key: 'id_ident_type' },
				{ boy: 'fm_activity', key: 'id_activity' },
				{ boy: 'fm_worker', key: 'id_aci' },
				{ boy: 'fm_location', key: 'id_location' },
				{ boy: 'fm_client', key: 'id_client' },
			],
		},
		{
			dad: 'fm_dir_pos',
			fks: [
				{ boy: 'fm_location', key: 'id_location' },
				{ boy: 'fm_commerce', key: 'id_commerce' },
			],
		},
		{
			dad: 'fm_location',
			fks: [
				{ boy: 'fm_estados', key: 'id_estado' },
				{ boy: 'fm_municipios', key: 'id_municipio' },
				{ boy: 'fm_ciudades', key: 'id_ciudad' },
				{ boy: 'fm_parroquias', key: 'id_parroquia' },
				{ boy: 'fm_cod_postal', key: 'id_cod_postal' },
			],
		},
		{
			dad: 'fm_municipios',
			fks: [{ boy: 'fm_estados', key: 'id_estado' }],
		},
		{
			dad: 'fm_parroquias',
			fks: [{ boy: 'fm_municipios', key: 'id_municipio' }],
		},
		{
			dad: 'fm_phone',
			fks: [{ boy: 'fn_client', key: 'id_client' }],
		},
		{
			dad: 'fm_request',
			fks: [
				{ boy: 'fn_client', key: 'id_client' },
				{ boy: 'fm_commerce', key: 'id_commerce' },
				{ boy: 'fm_type_request', key: 'id_type_request' },
				{ boy: 'fm_status_request', key: 'id_status_request' },
				{ boy: 'fm_way_pay', key: 'id_way_pay' },
			],
		},
		{
			dad: 'fn_client',
			fks: [
				{ boy: 'fm_roles', key: 'id_roles' },
				{ boy: 'fm_ident_type', key: 'id_ident_type' },
				{ boy: 'fm_department', key: 'id_depart' },
			],
		},
	]);
};
