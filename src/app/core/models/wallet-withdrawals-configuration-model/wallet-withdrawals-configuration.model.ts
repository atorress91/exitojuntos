export class WalletWithdrawalsConfiguration {
  minimum_amount: number;
  maximum_amount: number;
  commission_amount: number;
  activate_invoice_cancellation: boolean;

  constructor() {
    this.minimum_amount = 0;
    this.maximum_amount = 0;
    this.commission_amount = 0;
    this.activate_invoice_cancellation = false;
  }

}
