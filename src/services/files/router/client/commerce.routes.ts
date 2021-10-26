import { Router } from 'express';
import { createCommerce } from '../../controllers/client/commerce';

const Commerce: Router = Router();

// rutas de Commerceos CRUD
//
Commerce.route('/commerce').get().post(createCommerce);
//
Commerce.route('/commerce/:user/:id').patch().delete();
//
export default Commerce;
