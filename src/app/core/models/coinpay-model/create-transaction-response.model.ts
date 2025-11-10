export class CreateTransactionResponse {
  data?: TransactionData;
  statusCode: number;
  idTypeStatusCode: number;
  codeMessage?: string;
  codeMessage2?: string;
  message?: string;
  idTransaction: number;
  idTypeNotificationSent: number;
}

export interface TransactionData {
  idTransaction: number;
  date?: string;
  idUser: number;
  idTeller: number;
  currency?: CurrencyInfo;
  amount: number;
  details?: string;
  qrCode?: string;
  customerNotified?: any;
}

export interface CurrencyInfo {
  id: number;
  name?: string;
  code?: string;
  isErc: boolean;
  isDigitalCurrency: boolean;
  description?: string;
}
