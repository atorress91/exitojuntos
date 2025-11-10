export class TransactionInfo {
  timeCreated: number;
  timeExpires: number;
  status: number;
  statusText: string | null;
  type: string;
  coin: string;
  amount: number;
  amountf: string;
  received: number;
  receivedf: string;
  recvConfirms: number;
  paymentAddress: string | null;
  senderIp: string | null;
  checkout: Checkout;
  shipping: any[];
}

export class Checkout {
  currency: string;
  amount: number;
  test: number;
  itemNumber: string | null;
  itemName: string | null;
  details: any[];
  invoice: string;
  custom: string;
  ipnUrl: string | null;
  amountf: number;
}
