import Exception from '../../errors/Exception';

import { compareHash } from '../../utils/hash';
import generateToken from '../../utils/jwt';

import CustomerRepository from '../../repositories/CustomerRepository';

import {
  IRequestAuthCustomer,
  Customer,
} from '../../interfaces/CustomerInterfaces';

interface IAuthAdminService {
  CustomerRepository: CustomerRepository;
  validate: (params: IRequestAuthCustomer) => boolean;
  execute: (params: IRequestAuthCustomer) => Promise<string>;
}

const defaultAuthException = new Exception({
  status: 'error',
  message: 'invalid e-mail or password',
  code: 102,
});

export default class AuthCustomervice implements IAuthAdminService {
  public CustomerRepository;

  constructor() {
    this.CustomerRepository = new CustomerRepository();
  }

  validate({ email, password }: IRequestAuthCustomer) {
    switch (true) {
      case !email:
        throw new Exception({
          status: 'validation',
          code: 100,
          message: 'email is required',
        });
      case !password: {
        throw new Exception({
          status: 'validation',
          code: 101,
          message: 'password is required',
        });
      }
      default:
        return true;
    }
  }

  async execute({ email, password }: IRequestAuthCustomer) {
    this.validate({ email, password });

    let foundCustomer: null | Customer = null;

    const CustomerParamType = 'email';

    if (CustomerParamType === 'email') {
      foundCustomer = await this.CustomerRepository.findByEmail(email);
    }

    if (!foundCustomer) throw defaultAuthException;

    const isPasswordValid = compareHash(
      password,
      foundCustomer.password as string,
    );

    if (!isPasswordValid) throw defaultAuthException;

    const token = generateToken({
      id: foundCustomer.id,
      name: foundCustomer.name,
      email: foundCustomer.email,
      phoneNumber: foundCustomer.phoneNumber,
    });

    return token;
  }
}
