export class Rol {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;

  constructor() {
    this.id=0;
    this.name = '';
    this.description = '';
    this.created_at = new Date();
    this.updated_at = new Date();
    this.deleted_at = null;
  }

}
