import { Application } from 'express';

// rputers
import Milpagos from './1000pagos';

//
export default (app: Application) => {
	Milpagos(app);
};
