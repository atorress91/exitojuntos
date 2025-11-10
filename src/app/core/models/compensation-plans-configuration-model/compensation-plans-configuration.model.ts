export class CompensationPlansConfiguration {
  automatic_activation: boolean;
  automatic_qualification: boolean;
  automatic_incentive_calculation: boolean;
  automatic_commission_calculation: boolean;

  constructor() {
    this.automatic_activation = false;
    this.automatic_qualification = false;
    this.automatic_incentive_calculation = false;
    this.automatic_commission_calculation = false;
  }
}
