export interface Role {
  id: string;
  name: string;
}

export interface Country {
  id?: number;
  name?: string;
}

export class UserAffiliate {
  id: number;
  name: string = '';
  lastName: string = '';
  password?: string;
  email: string = '';
  phone: string = '';
  identification: string = '';
  address: string = '';
  city: string = '';
  state: string = '';
  zipCode?: string;
  father: number;
  side: number;
  status: boolean;
  imageProfileUrl: string = '';
  verificationCode?: string;
  termsConditions: boolean;
  birtDate: string = '';
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  role: Role = {
    id: '',
    name: '',
  };
  country?: Country;
}
