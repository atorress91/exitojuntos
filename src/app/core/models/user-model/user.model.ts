export class User {
  id: number;
  rol_id: number;
  is_affiliate: number;
  password: string;
  user_name: string;
  rol_name: string;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  observation: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
  token: string;
  image_profile_url:string;

  constructor() {
    this.id = 0;
    this.rol_id = 0;
    this.user_name = '';
    this.password = '';
    this.is_affiliate = 0;
    this.rol_name = '';
    this.name = '';
    this.last_name = '';
    this.email = '';
    this.phone = '';
    this.address = '';
    this.observation = '';
    this.status = false;
    this.created_at = new Date();
    this.updated_at = new Date();
    this.token = '';
    this.image_profile_url='';
  }
}
