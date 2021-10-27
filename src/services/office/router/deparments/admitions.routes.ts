import { Router } from 'express';
import { getAllDiferidosByAdmition } from '../../controllers/admition';

const Amition: Router = Router();

// Amition
//
Amition.route('/amition/diferidos').get(getAllDiferidosByAdmition);

export default Amition;
