import express from 'express';
import customerRoutes from './customer.routes';
import adminRoutes from './admin.routes';

const routes = express.Router();

routes.use('/customer', customerRoutes);
routes.use('/admin', adminRoutes);

export default routes;
