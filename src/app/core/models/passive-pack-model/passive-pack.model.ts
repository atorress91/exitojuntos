export class PassivePack {

  id?: number;
  maxGainLimit: number;
  companyPercentage: number;
  ecoPoolPercentage: number;
  dateInit: Date;
  dateEnd: Date;
  periodDate?: Date;
  case: number;
  levels: LevelEcoPoolRequest[] = [];
  companyPercentageLevels: number;


  constructor() {
    this.id = 0;
    this.maxGainLimit = 0;
    this.companyPercentage = 0;
    this.ecoPoolPercentage = 0;
    this.dateInit = new Date();
    this.dateEnd = new Date();
    this.case = 0;
    this.companyPercentageLevels = 0;
  }
}


export class LevelEcoPoolRequest {
  id: number;
  level: number;
  percentage: number;

  constructor() {
    this.id = 0;
    this.level = 0;
    this.percentage = 0;
  }
}
