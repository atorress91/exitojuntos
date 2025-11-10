export class ConceptLevel {
  id: number;
  conceptId: number;
  level: number;
  percentage: number;
  equalization: number;
  status: boolean;
  compression: boolean;

  constructor() {
    this.id = 0;
    this.conceptId = 0;
    this.level = 0;
    this.percentage = 0;
    this.equalization = 0;
    this.status = false;
    this.compression = false;
  }
}
