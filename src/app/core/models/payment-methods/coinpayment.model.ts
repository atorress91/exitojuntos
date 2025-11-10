export class CoinPaymentModel {
  cmd: string;
  reset: string;
  merchant: string;
  currency: string;
  amountf: number;
  success_url: string;
  item_name: string;

  constructor() {
    this.cmd = '';
    this.reset = '';
    this.merchant = '';
    this.currency = '';
    this.amountf = 0;
    this.success_url = '';
    this.item_name = '';
  }
}
