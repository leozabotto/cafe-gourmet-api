import { PrismaClient } from '@prisma/client';
import { Admin } from '../interfaces/AdminInterfaces';

const prisma = new PrismaClient();

export default class AdminRepository {
  async findById(id: number) {
    const customer = await prisma.customer.findUnique({
      where: {
        id,
      },
    });

    return customer;
  }

  async findByEmail(email: string) {
    const customer = await prisma.customer.findUnique({
      where: {
        email,
      },
    });

    return customer;
  }

  async findByPhoneNumber(phoneNumber: string): Promise<Admin | null> {
    const customer = await prisma.customer.findUnique({
      where: {
        phoneNumber,
      },
    });

    return customer;
  }
}
