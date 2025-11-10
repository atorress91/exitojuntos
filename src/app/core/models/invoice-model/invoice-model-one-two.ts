export class InvoiceModelOneTwo {
  userName: string;
  invoiceId: number;
  productName: string;
  baseAmount: number;
  paymentGroupId: number;
  createdAt: Date;

  constructor() {
    this.userName = '';
    this.invoiceId = 0;
    this.productName = '';
    this.baseAmount = 0;
    this.paymentGroupId = 0;
    this.createdAt = new Date();
  }
}
