import Exception from '../../errors/Exception';
import AddressRepository from '../../repositories/AddressRepository';

import {
  IRequestUpdateAddress,
  Address,
} from '../../interfaces/AddressInterfaces';

interface IUpdateAddressService {
  AddressRepository: AddressRepository;
  validate: (params: IRequestUpdateAddress) => Promise<boolean>;
  execute: (params: IRequestUpdateAddress) => Promise<Address>;
}

export default class UpdateAddressService implements IUpdateAddressService {
  public AddressRepository;

  constructor() {
    this.AddressRepository = new AddressRepository();
  }

  async validate({
    city,
    neighborhood,
    number,
    state,
    street,
    zipcode,
  }: IRequestUpdateAddress) {
    switch (true) {
      case !city:
        throw new Exception({
          status: 'validation',
          code: 100,
          message: 'city is required',
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
    neighborhood,
    number,
    state,
    street,
    zipcode,
    complement,
    id,
  }: IRequestUpdateAddress) {
    await this.validate({
      city,
      neighborhood,
      number,
      state,
      street,
      zipcode,
      complement,
      id,
    });
    const Address = await this.AddressRepository.update({
      city,
      neighborhood,
      number,
      state,
      street,
      zipcode,
      complement,
      id,
    });

    return Address;
  }
}
