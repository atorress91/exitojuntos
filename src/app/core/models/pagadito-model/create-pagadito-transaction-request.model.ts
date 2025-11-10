import { PagaditoTransactionDetailRequest } from "./pagadito-transaction-detail-request.model";

interface CustomDictionary {
  [key: string]: any;
}

export class CreatePagaditoTransactionRequest {
  amount: number;
  affiliate_id: number;
  details: PagaditoTransactionDetailRequest[];
  custom: CustomDictionary;

  constructor() {
    this.amount = 0;
    this.affiliate_id = 0;
    this.details = [];
    this.custom = {};
  }
}
