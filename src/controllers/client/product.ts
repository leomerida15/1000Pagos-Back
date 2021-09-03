import { Request, Response, NextFunction } from 'express';
import { Api } from 'interfaces';
import fm_product from '../../db/models/fm_product';
import { getRepository } from 'typeorm';

// traer producto
export const getProducts = async (
	req: Request<any, Api.resp, fm_product>,
	res: Response<Api.resp>,
	next: NextFunction,
): Promise<void> => {
	try {
		const info = await getRepository(fm_product)
			.createQueryBuilder('fm_product')
			.leftJoinAndSelect('fm_product.id_paym_method', 'fm_paym_method')
			.getMany();

		res.status(200).json({ message: 'lista de productos', info });
	} catch (err) {
		next(err);
	}
};

// crear producto
export const createProducts = async (
	req: Request<any, Api.resp, fm_product>,
	res: Response<Api.resp>,
	next: NextFunction,
): Promise<void> => {
	try {
		const info = await getRepository(fm_product)
			.createQueryBuilder('fm_product')
			.leftJoinAndSelect('fm_product.id_paym_method', 'fm_paym_method')
			.getMany();

		res.status(200).json({ message: 'lista de productos', info });
	} catch (err) {
		next(err);
	}
};
