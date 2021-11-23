export interface Resp<info = any> {
	message: string;
	info?: info;
	token?: string;
}

export interface params {
	id: string | number;
}

export interface pMunicipio {
	id_estado: string | number;
}

export interface pParroquia {
	id_municipio: string | number;
}

export interface pCiudad {
	id_estado: string | number;
}

export interface pFM {
	id_request: any;
}

export interface RC {
	id_client: string;
	id_commerce: string;
	bank_account_num: string;
}
