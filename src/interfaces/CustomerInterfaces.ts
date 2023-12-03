export interface Customer {
  id?: number;
  name?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
}

export interface IRequestCreateCustomer {
  name: string;
  email: string;
  cpf: string;
  phoneNumber: string;
  password: string;
}

export interface IRequestAuthCustomer {
  email: string;
  password: string;
}

export interface IRequestFindCustomer {
  id?: number;
}
