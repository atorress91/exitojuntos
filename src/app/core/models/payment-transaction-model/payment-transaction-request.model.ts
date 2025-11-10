export class PaymentTransaction {
  idTransaction: string;
  affiliateId: number;
  amount: number;
  products: string;
  createdAt: Date;

  constructor() {
    this.idTransaction = '';
    this.affiliateId = 0;
    this.amount = 0;
    this.products = '';
    this.createdAt = new Date();
  }
}
