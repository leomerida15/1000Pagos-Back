import { Router } from 'express';

const Worker: Router = Router();

// controllers
import { workerAll, worker, workerByRol, getWorkerById, editWorkerById } from '../../controllers/auth/worker';
import { rolesAll } from '../../controllers/auth/roles';

// ? worker
//
Worker.route('/worker').get(worker);
//
Worker.route('/worker/all').get(workerAll);
//
Worker.route('/worker/:id').get(getWorkerById).put(editWorkerById);
//
Worker.route('/roles/all').get(rolesAll);
//
Worker.route('/roles/:id/worker').get(workerByRol);

export default Worker;
