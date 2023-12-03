import express from 'express';
import CustomerController from '../controllers/CustomerController';

const customerRoutes = express.Router();
const customerController = new CustomerController();

customerRoutes.get('/:id', customerController.find);
customerRoutes.post('/', customerController.create);
customerRoutes.post('/auth', customerController.auth);

export default customerRoutes;
