import { Router } from 'express';
import { getProducts } from '../../controllers/client/product';

const Product: Router = Router();

// rutas de Productos CRUD
//
Product.route('/product').get(getProducts).post();
//
Product.route('/product/:user/:id').patch().delete();
//
export default Product;
