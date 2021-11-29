import { Router } from 'express';
import { getAllDiferidosByAdmition } from '../../controllers/admition';
import { getAllDeparments } from '../../controllers/global/index';

const Deparments: Router = Router();

// Amition
//
Deparments.route('/department/all').get(getAllDeparments);

export default Deparments;
