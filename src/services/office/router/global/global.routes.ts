import { Router } from 'express';
import { getAllIdent_type, getAllActivity } from '../../controllers/global';
import { getAllStatus, getAllCompanys } from '../../controllers/global/index';
import { getAllProcusts } from '../../controllers/products/index';
const global: Router = Router();

// controllers

// ? Ident_type
//
global.route('/ident_type').get(getAllIdent_type);

// ? activity
//
global.route('/activity').get(getAllActivity);

// ? status
//
global.route('/status').get(getAllStatus);

// ? company
//
global.route('/company').get(getAllCompanys);

// ?
//
// global.route('/')

// ? images
export default global;
