import express from 'express';
import ProductController from '../controllers/ProductController';

const productRoutes = express.Router();
const productController = new ProductController();

productRoutes.get('/', productController.findAll);
productRoutes.get('/:id', productController.find);
productRoutes.post('/', productController.create);
productRoutes.put('/:id', productController.update);

export default productRoutes;
