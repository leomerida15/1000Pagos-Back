import { id } from './db';
export interface resp<info = any> {
	message: string;
	info?: info;
}

export interface params {
	id: string | number;
}
