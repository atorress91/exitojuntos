export class WalletWait {
  id: number;
  affiliateId: number;
  credit: number;
  paymentMethod: string;
  bank: string;
  support: string;
  depositDate: Date;
  status: boolean;
  attended: boolean;
  date: Date;
  order: string;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.id = 0;
    this.affiliateId = 0;
    this.credit = 0;
    this.paymentMethod = '';
    this.bank = '';
    this.support = '';
    this.depositDate = new Date();
    this.status = false;
    this.attended = false;
    this.date = new Date();
    this.order = '';
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
