import { Request, Response } from 'express';
import {
  IRequestCreateCustomer,
  IRequestAuthCustomer,
  IRequestFindCustomer,
} from '../interfaces/CustomerInterfaces';

import AuthCustomerService from '../services/Customer/AuthCustomerService';
import CreateCustomerService from '../services/Customer/CreateCustomerService';
import FindCustomerService from '../services/Customer/FindCustomerService';

export default class CustomerController {
  async create(req: Request, res: Response) {
    const { name, email, password, cpf, phoneNumber }: IRequestCreateCustomer =
      req.body;

    const createCustomerService = new CreateCustomerService();
    const createdCustomer = await createCustomerService.execute({
      name,
      email,
      password,
      cpf,
      phoneNumber,
    });

    res.json(createdCustomer);
  }

  async find(req: Request, res: Response) {
    const { id }: IRequestFindCustomer = req.params;

    const findCustomerService = new FindCustomerService();
    const foundCustomer = await findCustomerService.execute({
      id,
    });

    res.json(foundCustomer);
  }

  async auth(req: Request, res: Response) {
    const { email, password }: IRequestAuthCustomer = req.body;

    const authCustomerService = new AuthCustomerService();
    const token = await authCustomerService.execute({ email, password });

    res.json({ token });
  }
}
