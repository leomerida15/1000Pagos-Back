import { Router } from 'express';
import { getAllCommerce, createCommerce } from '../controllers/TMS7';
import { CreateCommerceData } from '../Middlewares/data/commerce';

const Commerce: Router = Router();

// Commerce
//
Commerce.route('/tms7/commerce').get(getAllCommerce).post(CreateCommerceData, createCommerce);
//
export default Commerce;
