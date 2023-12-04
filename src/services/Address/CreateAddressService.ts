import Exception from '../../errors/Exception';
import AddressRepository from '../../repositories/AddressRepository';

import {
  IRequestCreateAddress,
  Address,
} from '../../interfaces/AddressInterfaces';

interface ICreateAddressService {
  AddressRepository: AddressRepository;
  validate: (params: IRequestCreateAddress) => Promise<boolean>;
  execute: (params: IRequestCreateAddress) => Promise<Address>;
}

export default class CreateAddressService implements ICreateAddressService {
  public AddressRepository;

  constructor() {
    this.AddressRepository = new AddressRepository();
  }

  async validate({
    city,
    customerId,
    neighborhood,
    number,
    state,
    street,
    zipcode,
  }: IRequestCreateAddress) {
    switch (true) {
      case !city:
        throw new Exception({
          status: 'validation',
          code: 100,
          message: 'city is required',
        });
      case customerId === undefined:
        throw new Exception({
          status: 'validation',
          code: 101,
          message: 'customerId is required',
        });
      case !neighborhood: {
        throw new Exception({
          status: 'validation',
          code: 103,
          message: 'neighborhood is required',
        });
      }
      case !number: {
        throw new Exception({
          status: 'validation',
          code: 103,
          message: 'number is required',
        });
      }
      case !state: {
        throw new Exception({
          status: 'validation',
          code: 103,
          message: 'state is required',
        });
      }
      case !street: {
        throw new Exception({
          status: 'validation',
          code: 103,
          message: 'street is required',
        });
      }
      case !zipcode: {
        throw new Exception({
          status: 'validation',
          code: 103,
          message: 'zipcode is required',
        });
      }

      default:
        return true;
    }
  }

  async execute({
    city,
    customerId,
    neighborhood,
    number,
    state,
    street,
    zipcode,
    complement,
  }: IRequestCreateAddress) {
    await this.validate({
      city,
      customerId,
      neighborhood,
      number,
      state,
      street,
      zipcode,
      complement,
    });
    const Address = await this.AddressRepository.create({
      city,
      customerId,
      neighborhood,
      number,
      state,
      street,
      zipcode,
      complement,
    });

    return Address;
  }
}
