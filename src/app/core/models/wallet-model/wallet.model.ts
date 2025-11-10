export class Wallet {
  id: number;
  affiliateId: number;
  adminUserName:string;
  affiliateUserName:string;
  userId: number;
  credit: number;
  debit: number;
  deferred: number;
  status: boolean;
  concept: string;
  support: number;
  date: Date;
  compression: boolean;
  detail: string;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.id = 0;
    this.affiliateId = 0;
    this.affiliateUserName='';
    this.adminUserName='';
    this.userId = 0;
    this.credit = 0;
    this.debit = 0;
    this.deferred = 0;
    this.status = false;
    this.concept = '';
    this.support = 0;
    this.date = new Date();
    this.compression = false;
    this.detail = '';
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
