import { Router } from 'express';
import { createCommerce } from '../controllers/App1000Pagos';
import { CreateCommerceData } from '../Middlewares/data/commerce';

const Commerce: Router = Router();

// Commerce
//
Commerce.route('/app1000pagos/commerce').post(CreateCommerceData, createCommerce);
//
export default Commerce;
