export class ProductCategory {
  id: number;
  name: string;
  description: string;
  category: number;
  level: number;
  date: Date;
  state: boolean;
  displaySmallBanner: boolean;
  displayBigBanner: boolean;

  constructor() {
    this.id = 0;
    this.name = '';
    this.description = '';
    this.category = 0;
    this.level = 0;
    this.date = new Date();
    this.state = false;
    this.displaySmallBanner = false;
    this.displayBigBanner = false;
  }
}
