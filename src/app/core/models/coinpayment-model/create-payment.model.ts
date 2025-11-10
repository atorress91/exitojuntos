export interface ProductRequest {
  productId: number;
  quantity: number;
}

export class CreatePayment {
  amount: number;
  buyer_email: string;
  buyer_name?: string;
  item_name?: string;
  item_number: string;
  products: ProductRequest[];
  ipn_url: string;
  currency1: string;
  currency2: string;
  address: string;

  constructor() {
    this.amount = 0;
    this.buyer_email = '';
    this.products = [];
    this.item_number = '';
    this.ipn_url = ''
    this.currency1 = '';
    this.currency2 = '';
    this.address = '';
  }
}
