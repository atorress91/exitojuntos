export interface EcoPoolConfiguration {
  id: number;
  case: number;
  companyPercentage: number;
  companyPercentageLevels: number;
  ecoPoolPercentage: number;
  maxGainLimit: number;
  completedAt: Date | null;
  levels: Levels;
}


export interface Levels {
  id: number;
  ecoPoolConfigurationId: number;
  level: number;
  percentage: number;
}
