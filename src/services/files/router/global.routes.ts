import { Router } from 'express';
import { upload, uploads } from '../Middlewares/upload/index';
import { createImage, createImages, getImageById } from '../controllers/globals.controllers';
import convert from '../Middlewares/upload/convert';

const Global: Router = Router();

// RC
// RC.route('/RC').post(upload, upFileRecaudos);
//
Global.route('/global/images').post(uploads, convert, createImages);
//
Global.route('/global/image').post(upload, convert, createImage);
//
Global.route('/global/image/:id').delete(createImage).get(getImageById).put(upload, convert);

//
export default Global;
