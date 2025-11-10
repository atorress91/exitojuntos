export class TransferBalance {
  fromAffiliateId: number;
  fromUserName: string;
  toUserName: string;
  amount?: number;
  securityCode?: string;

  constructor() {
    this.fromAffiliateId = 0;
    this.fromUserName = '';
    this.toUserName = '';
    this.amount = 0;
    this.securityCode = '';
  }
}
