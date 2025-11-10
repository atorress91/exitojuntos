export class Privilege {
  id: number;
  rol_id: number;
  menu_configuration_id: number;
  can_create: boolean;
  can_read: boolean;
  can_delete: boolean;
  can_edit: boolean;
  created_at: Date;
  updated_at: Date;

  constructor() {
    this.id = 0;
    this.rol_id = 0;
    this.menu_configuration_id = 0;
    this.can_create = false;
    this.can_read = false;
    this.can_delete = false;
    this.can_edit = false;
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}
