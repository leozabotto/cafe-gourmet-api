import Exception from '../../errors/Exception';

import { compareHash } from '../../utils/hash';
import generateToken from '../../utils/jwt';

import AdminRepository from '../../repositories/AdminRepository';

import { IRequestAuthAdmin, Admin } from '../../interfaces/AdminInterfaces';

interface IAuthAdminService {
  AdminRepository: AdminRepository;
  validate: (params: IRequestAuthAdmin) => boolean;
  execute: (params: IRequestAuthAdmin) => Promise<string>;
}

const defaultAuthException = new Exception({
  status: 'error',
  message: 'invalid e-mail or password',
  code: 102,
});

export default class AuthAdminvice implements IAuthAdminService {
  public AdminRepository;

  constructor() {
    this.AdminRepository = new AdminRepository();
  }

  validate({ email, password }: IRequestAuthAdmin) {
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

  async execute({ email, password }: IRequestAuthAdmin) {
    this.validate({ email, password });

    let foundAdmin: null | Admin = null;

    const AdminParamType = 'email';

    if (AdminParamType === 'email') {
      foundAdmin = await this.AdminRepository.findByEmail(email);
    }

    console.log(email);
    console.log(foundAdmin);

    if (!foundAdmin) throw defaultAuthException;

    const isPasswordValid = compareHash(
      password,
      foundAdmin.password as string,
    );

    if (!isPasswordValid) throw defaultAuthException;

    const token = generateToken({
      id: foundAdmin.id,
      name: foundAdmin.name,
      email: foundAdmin.email,
    });

    return token;
  }
}
