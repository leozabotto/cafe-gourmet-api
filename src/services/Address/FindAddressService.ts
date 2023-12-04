import Exception from '../../errors/Exception';
import AddressRepository from '../../repositories/AddressRepository';

import {
  IRequestFindAddress,
  Address,
} from '../../interfaces/AddressInterfaces';

interface IFindAddressService {
  addressRepository: AddressRepository;
  validate: (params: IRequestFindAddress) => boolean;
  execute: (params: IRequestFindAddress) => Promise<Address>;
}

export default class FindAddressService implements IFindAddressService {
  public addressRepository;

  constructor() {
    this.addressRepository = new AddressRepository();
  }

  validate({ id }: IRequestFindAddress) {
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

  async execute({ id }: IRequestFindAddress) {
    this.validate({ id });

    const foundAddress = (await this.addressRepository.findById(
      Number(id),
    )) as unknown as Address;

    if (!foundAddress)
      throw new Exception({
        status: 'error',
        message: 'address not found',
        code: 404,
      });

    return foundAddress;
  }
}
