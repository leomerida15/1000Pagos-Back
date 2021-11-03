import { Router } from 'express';
import { getAllProcusts, createProducts } from '../../controllers/products/index';
const Product: Router = Router();

// controllers

// ? products
//
Product.route('/products').get(getAllProcusts).post(createProducts);

// ? images
export default Product;
