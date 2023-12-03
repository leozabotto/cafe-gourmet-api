import Exception from '../../errors/Exception';

import AdminRepository from '../../repositories/AdminRepository';

import { IRequestFindAdmin, Admin } from '../../interfaces/AdminInterfaces';

interface IFindAdminService {
  customerRepository: AdminRepository;
  validate: (params: IRequestFindAdmin) => boolean;
  execute: (params: IRequestFindAdmin) => Promise<Admin>;
}

export default class AuthAdminService implements IFindAdminService {
  public customerRepository;

  constructor() {
    this.customerRepository = new AdminRepository();
  }

  validate({ id }: IRequestFindAdmin) {
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

  async execute({ id }: IRequestFindAdmin) {
    this.validate({ id });

    const foundAdmin = (await this.customerRepository.findById(
      Number(id),
    )) as Admin;

    if (!foundAdmin)
      throw new Exception({
        status: 'error',
        message: 'user not found',
        code: 404,
      });

    delete foundAdmin.password;

    return foundAdmin;
  }
}
