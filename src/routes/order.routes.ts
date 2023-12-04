import express from 'express';
import OrderController from '../controllers/OrderController';

const orderRoutes = express.Router();
const orderController = new OrderController();

orderRoutes.get('/', orderController.findAll);
orderRoutes.get('/:id', orderController.find);
orderRoutes.post('/', orderController.create);
orderRoutes.put('/:id', orderController.update);

export default orderRoutes;
