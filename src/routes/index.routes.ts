import express from 'express';
import customerRoutes from './customer.routes';
import adminRoutes from './admin.routes';
import productRoutes from './product.routes';

const routes = express.Router();

routes.use('/customer', customerRoutes);
routes.use('/admin', adminRoutes);
routes.use('/product', productRoutes);

export default routes;
