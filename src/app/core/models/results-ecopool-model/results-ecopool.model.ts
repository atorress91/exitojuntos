export class ResultsEcoPool {
  id: number;
  ecoPoolConfigurationId: number;
  productExternalId: number;
  affiliateId: number;
  affiliateName: string;
  productName: string;
  paymentDate: Date;
  lastDaydate: Date;
  dailyPercentage: number;
  basePack: number;
  daysAmount: number;
  baseAmount: number;
  companyAmount: number;
  companyPercentage: number;
  profitDistributedLevels: number;
  totalPercentage: number;
  deductionAmount: number;
  paymentAmount: number;
  points: string;
  casePool: string;
  periodPool: Date;

  constructor() {
    this.id = 0;
    this.ecoPoolConfigurationId = 0;
    this.productExternalId = 0;
    this.affiliateId = 0;
    this.affiliateName = '';
    this.productName = '';
    this.paymentDate = new Date();
    this.lastDaydate = new Date();
    this.dailyPercentage = 0;
    this.basePack = 0;
    this.daysAmount = 0;
    this.baseAmount = 0;
    this.companyAmount = 0;
    this.companyPercentage = 0;
    this.profitDistributedLevels = 0;
    this.totalPercentage = 0;
    this.deductionAmount = 0;
    this.paymentAmount = 0;
    this.points = '';
    this.casePool = '';
    this.periodPool = new Date();
  }
}
