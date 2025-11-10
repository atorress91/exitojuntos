export class BalanceInformation {
  reverseBalance: number;
  totalAcquisitions: number;
  availableBalance: number;
  totalCommissionsPaid: number;
  serviceBalance: number;
  bonusAmount: number;

  constructor() {
    this.reverseBalance = 0;
    this.totalAcquisitions = 0;
    this.availableBalance = 0;
    this.totalCommissionsPaid = 0;
    this.serviceBalance = 0;
    this.bonusAmount = 0;
  }
}
