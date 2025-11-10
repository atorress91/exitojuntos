export class ProductCombination {
  id: number;
  idProduct: number;
  idAttributes: number;
  codeRef: string;
  displayBigBanner: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.id = 0;
    this.idProduct = 0;
    this.idAttributes = 0;
    this.codeRef = '';
    this.displayBigBanner = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
