export class ProductAttribute {
  id: number;
  attribute: number;
  name: string;
  description: string;
  type: boolean;
  position: number;
  color: string;
  state: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.id = 0;
    this.attribute = 0;
    this.name = '';
    this.description = '';
    this.type = false;
    this.position = 0;
    this.color = '';
    this.state = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
