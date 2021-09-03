import { Application } from 'express';
import commerce from './commerce.routes';
import Product from './product.routes';
//
export default (app: Application) => {
	app.use('/client', commerce);
	app.use('/clinet', Product);
};
