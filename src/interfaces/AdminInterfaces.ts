export interface Admin {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
}

export interface IRequestAuthAdmin {
  email: string;
  password: string;
}

export interface IRequestFindAdmin {
  id?: number;
}
