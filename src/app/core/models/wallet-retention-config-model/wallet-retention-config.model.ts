export class WalletRetentionConfig {
  id: number;
  withdrawalFrom: number;
  withdrawalTo: number;
  percentage: number;
  date: Date;
  disableDate: Date;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.id = 0;
    this.withdrawalFrom = 0;
    this.withdrawalTo = 0;
    this.percentage = 0;
    this.date = new Date();
    this.disableDate = new Date();
    this.status = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
