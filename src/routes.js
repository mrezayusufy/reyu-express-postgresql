import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';
import authAdminMiddleware from './app/middlewares/authAdmin';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ViewController from './app/controllers/view/ViewController';

const routes = new Router();
const upload = multer(multerConfig);
routes.get('/', ViewController.index);
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.use(authMiddleware);
routes.put('/users', UserController.update);
routes.put('/users/email-verified', UserController.emailVerified);
routes.put('/users/admin-verified', UserController.adminVerified);

routes.post('/files', upload.single('file'), FileController.store);

routes.use(authAdminMiddleware);

routes.get('/users', UserController.index);
export default routes;
