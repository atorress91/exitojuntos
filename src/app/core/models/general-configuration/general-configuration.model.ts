export class GeneralConfiguration {
  paymentModelCutoffDate: Date;
  isUnderMaintenance: boolean;

  constructor() {
    this.paymentModelCutoffDate = new Date();
    this.isUnderMaintenance = false;
  }
}
