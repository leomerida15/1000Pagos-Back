import fm_payment_method from '../models/fm_payment_method';
import { getRepository } from 'typeorm';

const payment_method = async (): Promise<void> => {
	const data: fm_payment_method[] = [
		{
			name: 'Deposito Bancario',
		},
		{
			name: 'Efectivo',
		},
		{
			name: 'Punto de venta',
		},
		{
			name: 'Transferencia',
		},
		{
			name: 'Pago movil',
		},
		{
			name: 'web 1000Pagos',
		},
	];
	//
	const valid = await getRepository(fm_payment_method).find({ where: data });
	if (!valid.length) await getRepository(fm_payment_method).save(data);
};

export default payment_method;
