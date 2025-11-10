export class WalletPeriod {
  id: number;
  date: Date;
  status: boolean;

  constructor(){
    this.id = 0;
    this.date = new Date();
    this.status = false;
  }
}
