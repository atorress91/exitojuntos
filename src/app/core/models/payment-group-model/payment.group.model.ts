export class PaymentGroup {
  id: number;
  name: string;
  status: boolean;
  description: string;
  created_at: Date;
  updated_at: Date;

  constructor() {
    this.id = 0;
    this.name = '';
    this.status = false;
    this.description = '';
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}
