export class WalletWithDrawal {
  id: number;
  affiliateId: number;
  affiliateUserName:string;
  amount: number;
  state: boolean;
  observation: string;
  adminObservation: string;
  date: Date;
  responseDate: Date;
  retentionPercentage: number;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.id = 0;
    this.affiliateId = 0;
    this.affiliateUserName='';
    this.amount = 0;
    this.state = false;
    this.observation = '';
    this.adminObservation = '';
    this.date = new Date();
    this.responseDate = new Date();
    this.retentionPercentage = 0;
    this.status = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
