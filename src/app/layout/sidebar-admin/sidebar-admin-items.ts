import { RouteInfo } from './sidebar-admin.metadata';

export const ROUTESADMIN: RouteInfo[] = [
  {
    path: '',
    title: 'MENUITEMS.MAIN.TEXT',
    iconType: '',
    icon: '',
    class: '',
    groupTitle: true,
    badge: '',
    badgeClass: '',
    roles: ['Administrador', 'subAdministrador'],
    submenu: [],
  },
  {
    path: '/admin/home-admin',
    title: 'ADMIN-ITEMS.HOME.TEXT',
    iconType: 'feather',
    icon: 'home',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    roles: ['Administrador', 'subAdministrador'],
    submenu: [],
  },
];
