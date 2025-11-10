export class ProductInventory {
  id: number;
  idProduct: number;
  ingress: number;
  egress: number;
  support: string;
  note: string;
  type: number;
  date: Date;
  idCombination: number;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.id = 0;
    this.idProduct = 0;
    this.ingress = 0;
    this.egress = 0;
    this.support = '';
    this.note = '';
    this.type = 0;
    this.date = new Date();
    this.idCombination = 0;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
