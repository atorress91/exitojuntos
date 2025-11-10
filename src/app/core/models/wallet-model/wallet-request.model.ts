export class WalletRequest {
  affiliateId: number;
  affiliateUserName: string;
  purchaseFor:number;
  bank: string;
  paymentMethod: number;
  secretKey: string;
  receiptNumber: string;
  productsList: ProductsRequests[];
  dailyBonusActivation?: boolean;
  includeInCommissionCalculation?: boolean;

  constructor() {
    this.affiliateId = 0;
    this.affiliateUserName = '';
    this.purchaseFor = 0;
    this.bank = '';
    this.paymentMethod = 0;
    this.secretKey = '';
    this.receiptNumber = '';
    this.productsList = [];
    this.dailyBonusActivation = false;
    this.includeInCommissionCalculation = false;
  }
}

export class ProductsRequests {
  idProduct: number;
  count: number;

  constructor() {
    this.idProduct = 0;
    this.count = 0;
  }
}
