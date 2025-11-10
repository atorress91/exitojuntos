export class CreateAffiliate {

  user_name: string;
  name: string;
  password: string;
  last_name: string;
  email: string;
  country: number;
  affiliate_type: string;
  father: number;
  sponsor: number;
  binary_sponsor: number;
  phone: string;
  state_place: string;
  city: string;
  binary_matrix_side: number;
  status: number;

  constructor() {
    this.user_name = '';
    this.name = '';
    this.password = '';
    this.last_name = '';
    this.email = '';
    this.country = 0;
    this.affiliate_type = '';
    this.father = 0;
    this.sponsor = 0;
    this.binary_sponsor = 0;

    this.phone = '';
    this.state_place = '';
    this.city = ''
    this.binary_matrix_side = 0;
    this.status = 0;
  }
}

