export class ProductDiscount {
  id: number;
  name: string;
  description: string;
  idProduct: number;
  qualification: number;
  percentage: number;
  pointsQualify: boolean;
  binaryPoints: boolean;
  commissionable: boolean;
  pCommissionable: number;
  pBinaryPoints: number;
  pPointsQualify: number;
  date: Date;

  constructor() {
    this.id = 0;
    this.name = '';
    this.description = '';
    this.idProduct = 0;
    this.qualification = 0;
    this.percentage = 0;
    this.pointsQualify = false;
    this.binaryPoints = false;
    this.commissionable = false;
    this.pCommissionable = 0;
    this.pBinaryPoints = 0;
    this.pPointsQualify = 0;
    this.date = new Date();
  }
}
