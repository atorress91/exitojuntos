export class MenuConfiguration {
  menu_configuration_id: number;
  privilege_id: number = 0;
  menu_name: string;
  page_name: string;
  can_create: boolean;
  can_read: boolean;
  can_edit: boolean;
  can_delete: boolean;
}
