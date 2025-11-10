export class UpdatePassword {
  id: number;
  password: string;
  new_password: string;
  confirm_password:string;

  constructor() {
    this.id = 0;
    this.new_password = '';
    this.password = '';
    this.confirm_password='';
  }
}
