export class PagaditoTransactionDetailRequest {
  quantity: number;
  description: string;
  price: number;
  url_product: string;

  constructor() {
    this.quantity = 0;
    this.description = '';
    this.price = 0;
    this.url_product = '';
  }
}
