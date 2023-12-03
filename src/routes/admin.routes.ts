import express from 'express';
import AdminController from '../controllers/AdminController';

const adminRoutes = express.Router();
const adminController = new AdminController();

adminRoutes.get('/:id', adminController.find);
adminRoutes.post('/auth', adminController.auth);

export default adminRoutes;
