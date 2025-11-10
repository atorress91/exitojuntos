export class TicketMessageRequest {
  id: number;
  ticketId: number;
  userId: number;
  messageContent: string;
  userName: string;
  imageProfileUrl: string;
  createdAt: Date;


  constructor() {
    this.id = 0;
    this.ticketId = 0;
    this.userId = 0;
    this.messageContent = '';
    this.userName = '';
    this.imageProfileUrl = '';
    this.createdAt = new Date;
  }
}
