import { Request, Response } from 'express';
import {
  IRequestAuthAdmin,
  IRequestFindAdmin,
} from '../interfaces/AdminInterfaces';

import AuthAdminService from '../services/Admin/AuthAdminService';
import FindAdminService from '../services/Admin/FindAdminService';

export default class AdminController {
  async find(req: Request, res: Response) {
    const { id }: IRequestFindAdmin = req.params;

    const findAdminService = new FindAdminService();
    const foundAdmin = await findAdminService.execute({
      id,
    });

    res.json(foundAdmin);
  }

  async auth(req: Request, res: Response) {
    const { email, password }: IRequestAuthAdmin = req.body;

    const authAdminService = new AuthAdminService();
    const token = await authAdminService.execute({ email, password });

    res.json({ token });
  }
}
