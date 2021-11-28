import { Router } from 'express';
import { getAllAliados } from '../../controllers/commerce/asi';

const Aci: Router = Router();

// controllers

// ? worker
//
Aci.route('/asi').get(getAllAliados);

export default Aci;
