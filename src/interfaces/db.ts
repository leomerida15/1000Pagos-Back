import { Model } from 'sequelize';
import fm_client from '../db/models/fm_client';

export interface id {
	id?: number;
}
export interface fn3 {
	id?: number;
	name?: string;
}

// 3fn
export interface WayPay extends fn3 {}
export interface WayPayInit extends fn3, Model {}
//
export interface Roles extends fn3 {}
export interface RolesInit extends fn3, Model {}
//
export interface StatusRequest extends fn3 {}
export interface StatusRequestInit extends fn3, Model {}
//
export interface TypeRequest extends fn3 {}
export interface TypeRequest extends fn3, Model {}
//
export interface Department extends fn3 {}
export interface DepartmentInit extends fn3, Model {}
//
export interface Activity extends fn3 {}
export interface ActivityInit extends fn3, Model {}
// !
export interface Client extends id {
	name?: string;
	last_name?: string;
	id_roles?: number;
	password?: string;
	id_ident_type?: number;
	ident_num?: string;
	id_depart?: number;
	email?: string;
	phone1?: string;
	phone2?: string;
}
export interface ClientInit extends Client, Model {}
// !
export interface worker extends id {
	name?: string;
	last_name?: string;
	id_roles?: number;
	password?: string;
	id_ident_type?: number;
	nro_ident?: string;
	id_depart?: number;
	phone?: string;
	email?: string;
}
export interface workerInit extends worker, Model {}
//
export interface Request extends id {
	cont_post?: number;
	fm_act?: string;
	fm_pro_doc?: string;
	fm_services?: string;
	fm_contributor?: string;
	fm_ref_bank?: string;
	fm_ref_perso?: string;
	fm_account?: string;
	fm_front_local?: string;
	fm_in_local?: string;
	fm_rif?: string;
	fm_ident_card?: string;
	way_pay_id?: number;
	Client_id?: number;
	commerce_id?: number;
	type_request_id?: number;
	status_request_id?: number;
}
export interface RequestInit extends Request, Model {}
//
export interface Phone extends id {
	Client_id?: number;
	phone_number?: string;
}
export interface PhoneInit extends Phone, Model {}
//
export interface Parroquia extends id {
	id_municipio?: number;
	parroquia?: string;
}
export interface ParroquiaInit extends Parroquia, Model {}
//
export interface Municipio extends id {
	id_estado?: number;
	municipio?: string;
}
export interface MunicipioInit extends Municipio, Model {}
//
export interface Location extends id {
	id_estado?: number;
	id_municipio?: number;
	id_ciudad?: number;
	id_parroquia?: number;
	id_cod_postal?: number;
	sector?: string;
	calle?: string;
	local?: string;
}
export interface LocationInit extends Location, Model {}
//
export interface IdentType extends id, fn3 {}
export interface IdentTypeInit extends IdentType, Model {}
//
export interface Estados extends id {
	estado?: string;
	iso_3166?: string;
}
export interface EstadosInit extends Estados, Model {}
//
export interface DirPos extends id {
	id_location?: number;
	id_comemerce?: number;
}
export interface DirPosInit extends DirPos, Model {}
//
export interface Commerce extends id {
	name?: string;
	nro_ident?: string;
	id_ident_type?: number;
	special_contributor?: number;
	id_activity?: number;
	id_location?: number;
	id_aci?: number;
	id_Client?: number;
}
export interface CommerceInit extends Commerce, Model {}
//
export interface CodPostal extends id {
	id_parroquia?: number;
	cod?: number;
}
export interface CodPostalInit extends CodPostal, Model {}
//
export interface Ciudad extends id {
	id_parroquia?: number;
	cod?: number;
}
export interface CiudadInit extends Ciudad, Model {}
//
export interface BackCommerce extends id {
	id_commerce?: number;
	id_banck?: number;
	bank_account_num?: number;
}
export interface BackCommerceInit extends BackCommerce, Model {
	hasMany: any;
}
//
export interface Banck extends id {
	name?: string;
	code?: number;
}
export interface BanckInit extends BackCommerce, Model {}
//
export interface Models {
	Roles: RolesInit;
	StatusRequest: StatusRequestInit;
	TypeReq: TypeRequest;
	Department: DepartmentInit;
	Activity: ActivityInit;
	Client: ClientInit;
	Request: RequestInit;
	Phone: PhoneInit;
	Parroquia: ParroquiaInit;
	Municipio: MunicipioInit;
	Location: LocationInit;
	IdentType: IdentTypeInit;
	Estados: EstadosInit;
	DirPos: DirPosInit;
	Commerce: CommerceInit;
	CodPostal: CodPostalInit;
	Ciudad: CiudadInit;
	BackCommerce: BackCommerceInit;
	Banck: BanckInit;
	WayPay: WayPayInit;
}

//
export interface Fks {
	boy: string;
	key: string;
}
export interface keysQuery {
	fks: Fks[];
	dad: any;
}
