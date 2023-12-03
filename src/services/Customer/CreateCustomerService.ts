import validator from 'validator';
import Exception from '../../errors/Exception';

import { transformToHash } from '../../utils/hash';

import CustomerRepository from '../../repositories/CustomerRepository';

import {
  IRequestCreateCustomer,
  Customer,
} from '../../interfaces/CustomerInterfaces';

interface ICreateCustomerService {
  CustomerRepository: CustomerRepository;
  validate: (params: IRequestCreateCustomer) => Promise<boolean>;
  execute: (params: IRequestCreateCustomer) => Promise<Customer>;
  isEmailAlreadyInUse: (email: string) => Promise<boolean>;
  isPhoneNumberAlreadyInUse: (CustomerName: string) => Promise<boolean>;
}

export default class CreateCustomerService implements ICreateCustomerService {
  public CustomerRepository;

  constructor() {
    this.CustomerRepository = new CustomerRepository();
  }

  async isEmailAlreadyInUse(email: string): Promise<boolean> {
    const Customer = await this.CustomerRepository.findByEmail(email);
    if (Customer) return true;
    return false;
  }

  async isPhoneNumberAlreadyInUse(phoneNumber: string): Promise<boolean> {
    const Customer = await this.CustomerRepository.findByPhoneNumber(
      phoneNumber,
    );
    if (Customer) return true;
    return false;
  }

  async validate({
    name,
    cpf,
    email,
    password,
    phoneNumber,
  }: IRequestCreateCustomer) {
    switch (true) {
      case !name:
        throw new Exception({
          status: 'validation',
          code: 100,
          message: 'name is required',
        });
      case !email:
        throw new Exception({
          status: 'validation',
          code: 101,
          message: 'email is required',
        });
      case !validator.isEmail(email):
        throw new Exception({
          status: 'validation',
          code: 102,
          message: 'email is not valid',
        });
      case !password: {
        throw new Exception({
          status: 'validation',
          code: 103,
          message: 'password is required',
        });
      }
      case !validator.isLength(password, { min: 6, max: 12 }): {
        throw new Exception({
          status: 'validation',
          code: 104,
          message: 'password must have 6 to 12 characters',
        });
      }
      case !phoneNumber:
        throw new Exception({
          status: 'validation',
          code: 106,
          message: 'phoneNumber is required',
        });
      case await this.isEmailAlreadyInUse(email):
        throw new Exception({
          status: 'validation',
          code: 107,
          message: 'email already in use',
        });
      case await this.isPhoneNumberAlreadyInUse(phoneNumber):
        throw new Exception({
          status: 'validation',
          code: 109,
          message: 'phoneNumber already in use',
        });
      case !cpf:
        throw new Exception({
          status: 'validation',
          code: 110,
          message: 'cpf is required',
        });
      default:
        return true;
    }
  }

  async execute({
    name,
    email,
    cpf,
    password,
    phoneNumber,
  }: IRequestCreateCustomer) {
    await this.validate({ name, email, cpf, password, phoneNumber });

    const passwordHash = transformToHash(password);

    const Customer = await this.CustomerRepository.create({
      name,
      email,
      cpf,
      phoneNumber,
      password: passwordHash,
    });

    return Customer;
  }
}
