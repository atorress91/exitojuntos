export class ConpaymentTransaction {
  amount: string;
  txn_Id: string;
  address: string;
  confirms_Needed: string;
  timeout: number;
  checkout_Url: string;
  status_Url: string;
  qrcode_Url: string;

  constructor() {
    this.amount = '';
    this.txn_Id = ''
    this.address = '';
    this.confirms_Needed = '';
    this.timeout = 0;
    this.checkout_Url = '';
    this.status_Url = '';
    this.qrcode_Url = '';
  }

}
