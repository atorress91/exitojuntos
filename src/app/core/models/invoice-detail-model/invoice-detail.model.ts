export class InvoiceDetail {

  id: number;
  invoiceId: number;
  productId: number;
  paymentGroupId: number;
  accumMinPurchase: boolean;
  productName: string;
  productPrice: number;
  productPriceBtc: number;
  productIva: number;
  productQuantity: number;
  productCommissionable: number;
  binaryPoints: number;
  productPoints: number;
  productDiscount: number;
  date: Date;
  combinationId: number;
  productPack: boolean;
  baseAmount: number;
  dailyPercentage: number;
  waitingDays: number;
  daysToPayQuantity: number;
  productStart: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.id = 0;
    this.invoiceId = 0;
    this.productId = 0;
    this.paymentGroupId = 0;
    this.accumMinPurchase = false;
    this.productName = '';
    this.productPrice = 0;
    this.productPriceBtc = 0;
    this.productIva = 0;
    this.productQuantity = 0;
    this.productCommissionable = 0;
    this.binaryPoints = 0;
    this.productPoints = 0;
    this.productDiscount = 0;
    this.date = new Date();
    this.combinationId = 0;
    this.productPack = false;
    this.baseAmount = 0;
    this.dailyPercentage = 0;
    this.waitingDays = 0;
    this.daysToPayQuantity = 0;
    this.productStart = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();

  }


}
