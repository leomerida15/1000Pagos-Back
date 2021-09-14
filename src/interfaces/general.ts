import { id } from './db';
import express from 'express';
export interface resp<info = any> {
	message: string;
	info?: info;
}

export interface params {
	id: string | number;
}

// controllers
// uploads RC
export interface legend {
	descript: any;
	i: number;
}

export interface RC {
	email: string;
	// rc_constitutive_act: number | string;
	// rc_property_document: number | string;
	// rc_service_document: number | string;
	// rc_special_contributor: number | string;
	// rc_ref_bank: number | string;
	// rc_ref_perso: number | string;
	// rc_account_number: number | string;
	// rc_front_local: number | string;
	// rc_in_local: number | string;
	// rc_rif: number | string;
	// rc_ident_card: number | string;
}
