import Exception from '../../errors/Exception';
import AddressRepository from '../../repositories/AddressRepository';

import { Address } from '../../interfaces/AddressInterfaces';

interface IFindAllAddressService {
  execute: () => Promise<Address[]>;
}

export default class FindAllAddressService implements IFindAllAddressService {
  public addressRepository;

  constructor() {
    this.addressRepository = new AddressRepository();
  }

  async execute() {
    const foundAddress =
      (await this.addressRepository.findAll()) as unknown as Address[];

    if (!foundAddress)
      throw new Exception({
        status: 'error',
        message: 'user not found',
        code: 404,
      });

    return foundAddress;
  }
}
