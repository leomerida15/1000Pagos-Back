import { Router } from 'express';
import { getAllCommerce } from '../controllers/TMS7';

const Commerce: Router = Router();

// Auth
//
Commerce.route('/commerce').get(getAllCommerce);
//
//
export default Commerce;
