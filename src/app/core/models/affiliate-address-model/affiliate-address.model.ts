export class AffiliateAddress {
  id: number;
  affiliateId: number;
  fiscalIdentification?: string;
  addressName: string;
  name: string;
  lastName: string;
  company?: string;
  ivaNumber?: string;
  address: string;
  addressLine2?: string;
  postalCode?: string;
  city?: string;
  state?: string;
  country: number;
  landlinePhone: string;
  mobilePhone: string;
  other?: string;
  date: Date;
  countryName: string;
  stateName?: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  constructor() {
    this.id = 0;
    this.affiliateId = 0;
    this.addressName = '';
    this.name = '';
    this.lastName = '';
    this.address = '';
    this.country = 0;
    this.landlinePhone = '';
    this.mobilePhone = '';
    this.date = new Date();
    this.countryName = '';
    this.email = '';
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
