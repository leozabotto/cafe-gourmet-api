import express from 'express';
import AddressController from '../controllers/AddressController';

const addressRoutes = express.Router();
const addressController = new AddressController();

addressRoutes.get('/', addressController.findAll);
addressRoutes.get('/:id', addressController.find);
addressRoutes.post('/', addressController.create);
addressRoutes.put('/:id', addressController.update);

export default addressRoutes;
