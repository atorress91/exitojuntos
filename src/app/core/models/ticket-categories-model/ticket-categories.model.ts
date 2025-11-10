export class TicketCategories {
  id: number;
  categoryName: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor() {
    this.id = 0;
    this.categoryName = '';
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.deletedAt = new Date();
  }
}
