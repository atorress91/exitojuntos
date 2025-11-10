import {TicketImagesRequest} from "@app/core/models/ticket-model/ticket-images-request.model";

export class TicketRequest {
  affiliateId: number;
  categoryId: number;
  subject: string;
  description: string;
  images: TicketImagesRequest[];


  constructor() {
    this.affiliateId = 0;
    this.categoryId = 0;
    this.subject = '';
    this.description = '';
    this.images = [];
  }
}
