export class TicketMessage {
  id: number;
  ticketId: number;
  userId: number;
  messageContent: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  isRead: boolean;
  userName:string;
  imageProfileUrl: string;

  constructor() {
    this.id = 0;
    this.ticketId = 0;
    this.userId = 0;
    this.messageContent = '';
    this.isRead = false;
    this.createdAt = new Date;
    this.updatedAt = new Date;
    this.deletedAt = null;
    this.userName = '';
    this.imageProfileUrl = '';
  }
}
