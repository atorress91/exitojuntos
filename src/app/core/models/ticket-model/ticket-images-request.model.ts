export class TicketImagesRequest {
  ticketId: number;
  imagePath: string;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.ticketId = 0;
    this.imagePath = '';
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
