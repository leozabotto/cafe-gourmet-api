type ExceptionStatus = 'error' | 'validation' | 'forbidden';

interface IException {
  status: ExceptionStatus;
  message: string;
  code: number;
}

export default class Exception {
  public readonly status;
  public readonly message;
  public readonly code;

  constructor({ status, message, code }: IException) {
    this.status = status;
    this.message = message;
    this.code = code;
  }
}
