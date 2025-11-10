export class RequestResetPassword {
  verificationCode: string;
  password: string;

  constructor() {
    this.verificationCode = '';
    this.password = '';
  }
}
