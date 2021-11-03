import { NextFunction, Request, Response } from 'express';
import { Api } from 'interfaces';
import { getRepository } from 'typeorm';
import fm_estado from '../../../../db/models/fm_estado';
import Resp from '../../Middlewares/res';
import fm_municipio from '../../../../db/models/fm_municipio';
import fm_parroquia from '../../../../db/models/fm_parroquia';
import fm_ciudad from '../../../../db/models/fm_ciudad';

export const getEstados = async (
	req: Request<any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		// getter list of estados to db ith typeorm
		const info = await getRepository(fm_estado).find();

		Resp(req, res, { message: 'lista de estados', info });
	} catch (err) {
		next(err);
	}
};

export const getMunicipiosByEstado = async (
	req: Request<Api.pMunicipio, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const { id_estado } = req.params;
		// getter list of estados to db ith typeorm
		const info = await getRepository(fm_municipio).find({ where: { id_estado } });

		Resp(req, res, { message: 'lista de parroquias', info });
	} catch (err) {
		next(err);
	}
};

export const getParroquiasByMunicipio = async (
	req: Request<Api.pParroquia, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const { id_municipio } = req.params;

		// getter list of estados to db ith typeorm
		const info = await getRepository(fm_parroquia).find({ where: { id_municipio } });

		Resp(req, res, { message: 'lista de municipios', info });
	} catch (err) {
		next(err);
	}
};

export const getCiudadByEstado = async (
	req: Request<Api.pCiudad, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const { id_estado } = req.params;

		// getter list of estados to db ith typeorm
		const info = await getRepository(fm_ciudad).find({ where: { id_estado } });

		Resp(req, res, { message: 'lista de ciudad', info });
	} catch (err) {
		next(err);
	}
};
