import { Request, Response } from 'express';
import {
  IRequestCreateAddress,
  IRequestUpdateAddress,
  IRequestFindAddress,
} from '../interfaces/AddressInterfaces';

import CreateAddressService from '../services/Address/CreateAddressService';
import UpdateAddressService from '../services/Address/UpdateAddressService';
import FindAddressService from '../services/Address/FindAddressService';
import FindAllAddressService from '../services/Address/FindAllAddressService';

export default class AddressController {
  async create(req: Request, res: Response) {
    const {
      city,
      complement,
      street,
      number,
      neighborhood,
      customerId,
      state,
      zipcode,
    }: IRequestCreateAddress = req.body;

    const createAddressService = new CreateAddressService();
    const createdAddress = await createAddressService.execute({
      city,
      complement,
      street,
      number,
      neighborhood,
      customerId,
      state,
      zipcode,
    });

    res.json(createdAddress);
  }

  async update(req: Request, res: Response) {
    const {
      city,
      complement,
      street,
      number,
      neighborhood,
      state,
      zipcode,
    }: IRequestUpdateAddress = req.body;

    const { id } = req.params;

    const updateAddressService = new UpdateAddressService();
    const updatedAddress = await updateAddressService.execute({
      id: +id,
      city,
      complement,
      street,
      number,
      neighborhood,
      state,
      zipcode,
    });

    res.json(updatedAddress);
  }

  async find(req: Request, res: Response) {
    const { id }: IRequestFindAddress = req.params;

    const findAddressService = new FindAddressService();
    const foundAddress = await findAddressService.execute({
      id,
    });

    res.json(foundAddress);
  }

  async findAll(req: Request, res: Response) {
    const findAllAddressService = new FindAllAddressService();
    const foundAddresss = await findAllAddressService.execute();

    res.json(foundAddresss);
  }
}
