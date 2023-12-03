import Exception from '../../errors/Exception';

import CustomerRepository from '../../repositories/CustomerRepository';

import {
  IRequestFindCustomer,
  Customer,
} from '../../interfaces/CustomerInterfaces';

interface IFindCustomerService {
  customerRepository: CustomerRepository;
  validate: (params: IRequestFindCustomer) => boolean;
  execute: (params: IRequestFindCustomer) => Promise<Customer>;
}

export default class AuthCustomerService implements IFindCustomerService {
  public customerRepository;

  constructor() {
    this.customerRepository = new CustomerRepository();
  }

  validate({ id }: IRequestFindCustomer) {
    switch (true) {
      case !id:
        throw new Exception({
          status: 'validation',
          code: 100,
          message: 'id is required',
        });
      default:
        return true;
    }
  }

  async execute({ id }: IRequestFindCustomer) {
    this.validate({ id });

    const foundCustomer = (await this.customerRepository.findById(
      Number(id),
    )) as Customer;

    if (!foundCustomer)
      throw new Exception({
        status: 'error',
        message: 'user not found',
        code: 404,
      });

    delete foundCustomer.password;

    return foundCustomer;
  }
}
