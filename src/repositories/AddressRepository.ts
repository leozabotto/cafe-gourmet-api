import { PrismaClient } from '@prisma/client';
import {
  IRequestCreateAddress,
  IRequestUpdateAddress,
  Address,
} from '../interfaces/AddressInterfaces';

const prisma = new PrismaClient();

export default class AddressRepository {
  async findById(id: number) {
    const address = await prisma.address.findUnique({
      where: {
        id,
      },
    });

    return address;
  }

  async findAll() {
    const address = await prisma.address.findMany();

    return address;
  }

  async create(params: IRequestCreateAddress): Promise<Address> {
    const address = await prisma.address.create({
      data: {
        ...params,
      },
    });

    return address as unknown as Address;
  }

  async update(params: IRequestUpdateAddress): Promise<Address> {
    const address = await prisma.address.update({
      where: {
        id: params.id,
      },
      data: {
        ...params,
      },
    });

    return address as unknown as Address;
  }
}
