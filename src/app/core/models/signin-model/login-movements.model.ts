export class LoginMovements {
  id: number;
  affiliateId: number;
  browserInfo: string;
  operatingSystem: string;
  status: boolean;
  ipAddress: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;

  constructor() {
    this.id = 0;
    this.affiliateId = 0;
    this.browserInfo = '';
    this.operatingSystem = '';
    this.status = false;
    this.ipAddress = '';
    this.created_at = '';
    this.updated_at = '';
    this.deleted_at = '';
  }
}
