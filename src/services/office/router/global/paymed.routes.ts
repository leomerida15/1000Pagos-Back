import { Router } from 'express';

const Payments: Router = Router();

// controllers
import { paymentAll, typePayment } from '../../controllers/global/payment';

// ? pay_medthod
//
Payments.route('/payment/all').get(paymentAll);
//
Payments.route('/payment/types').get(typePayment);

export default Payments;
