export class AddressBtc {
  id: number;
  affiliateId: number;
  address: string;
  status: boolean;
  networkId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor() {
    this.id = 0;
    this.affiliateId = 0;
    this.address = '';
    this.status = false;
    this.networkId = 0;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
