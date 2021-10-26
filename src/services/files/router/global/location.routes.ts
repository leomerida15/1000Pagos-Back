import { Router } from 'express';
import { RegisterData1, RegisterData2, RegisterData } from '../../Middlewares/data/auth';

const Location: Router = Router();

// controllers
import { editPass, login, passMail, register, registerValid1, registerValid2 } from '../../controllers/auth/index';

// ? Auth
//
Location.route('/Location/:id').get();
//
Location.route('/Location/estado').get();
//
Location.route('/Location/:estado/municipio').get();
//
Location.route('/Location/:estado/:municipio/parroquia').get();
//
Location.route('/Location/:estado/:municipio/parroquia/ciudad').get();

export default Location;
