import { PrismaClient } from '@prisma/client';
import { Admin } from '../interfaces/AdminInterfaces';

const prisma = new PrismaClient();

export default class AdminRepository {
  async findById(id: number) {
    const admin = await prisma.admin.findUnique({
      where: {
        id,
      },
    });

    return admin;
  }

  async findByEmail(email: string) {
    const admin = await prisma.admin.findUnique({
      where: {
        email,
      },
    });

    return admin;
  }
}
