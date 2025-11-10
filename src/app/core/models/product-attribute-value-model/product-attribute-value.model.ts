export class ProductAttributeValue {
  id: number;
  idAttribute: number;
  attributeValue: string;
  position: number;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.id = 0;
    this.idAttribute = 0;
    this.attributeValue = '';
    this.position = 0;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
