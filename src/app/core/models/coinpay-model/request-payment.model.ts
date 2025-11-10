export interface ProductRequest {
  productId: number;
  quantity: number;
}

export class RequestPayment {
  affiliateId: number;
  userName: string;
  amount: number;
  products: ProductRequest[];
  networkId: number;
  currencyId: number;

  constructor() {
    this.affiliateId = 0;
    this.userName = '';
    this.amount = 0;
    this.products = [];
    this.networkId = 0;
    this.currencyId = 0;
  }
}
