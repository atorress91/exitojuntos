export class PaymentTransaction {
  id: number;
  userName?: string;
  idTransaction: string;
  affiliateId: number;
  amount: number;
  amountReceived: number;
  products: string;
  status: number;
  acredited: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  paymentMethod?: string;

  constructor() {
    this.id = 0;
    this.userName = '';
    this.idTransaction = '';
    this.affiliateId = 0;
    this.amount = 0;
    this.amountReceived = 0;
    this.products = '';
    this.status = 0;
    this.acredited = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.deletedAt = new Date();
    this.paymentMethod = '';
  }
}
