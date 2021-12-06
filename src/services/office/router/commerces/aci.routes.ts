import { Router } from 'express';
import { getAllAliados } from '../../controllers/commerce/asi';

const Aci: Router = Router();

// controllers

// ? worker
//
Aci.route('/aci').get(getAllAliados);

export default Aci;
