import { Routes } from '@angular/router';
import { AuthGuard } from '@app/core/guard/auth.guard';
import { MaintenanceGuard } from '@app/core/guard/maintenance.guard';

export const CLIENT_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    canActivate: [AuthGuard, MaintenanceGuard],
  },
  {
    path: 'addresses',
    loadComponent: () => import('./addresses/addresses.component').then(m => m.AddressesComponent),
    canActivate: [AuthGuard, MaintenanceGuard],
  },
  {
    path: 'billing-orders',
    loadComponent: () => import('./billing-orders/billing-orders.component').then(m => m.BillingOrdersComponent),
    canActivate: [AuthGuard, MaintenanceGuard],
  },
  {
    path: 'billing-purchase',
    loadComponent: () => import('./billing-purchase/billing-purchase.component').then(m => m.BillingPurchaseComponent),
    canActivate: [AuthGuard, MaintenanceGuard],
  },
  {
    path: 'billing-purchases',
    loadComponent: () => import('./billing-purchases/billing-purchases.component').then(m => m.BillingPurchasesComponent),
    canActivate: [AuthGuard, MaintenanceGuard],
  },
  {
    path: 'commissions',
    loadComponent: () => import('./commissions/commissions.component').then(m => m.CommissionsComponent),
    canActivate: [AuthGuard, MaintenanceGuard],
  },
  {
    path: 'commissions-balance',
    loadComponent: () => import('./commissions-balance/commissions-balance.component').then(m => m.CommissionsBalanceComponent),
    canActivate: [AuthGuard, MaintenanceGuard],
  },
  {
    path: 'inducements',
    loadComponent: () => import('./inducements/inducements.component').then(m => m.InducementsComponent),
    canActivate: [AuthGuard, MaintenanceGuard],
  },
  {
    path: 'network',
    loadComponent: () => import('./network/network.component').then(m => m.NetworkComponent),
    canActivate: [AuthGuard, MaintenanceGuard],
  },
  {
    path: 'news',
    loadComponent: () => import('./news/news.component').then(m => m.NewsComponent),
    canActivate: [AuthGuard, MaintenanceGuard],
  },
  {
    path: 'procurement-ecopool',
    loadComponent: () => import('./procurement-ecopool/procurement-ecopool.component').then(m => m.ProcurementEcopoolComponent),
    canActivate: [AuthGuard, MaintenanceGuard],
  },
  {
    path: 'requests',
    loadComponent: () => import('./requests/requests.component').then(m => m.RequestsComponent),
    canActivate: [AuthGuard, MaintenanceGuard],
  },
  {
    path: 'my-profile',
    loadComponent: () => import('./my-profile/my-profile.component').then(m => m.MyProfileComponent),
    canActivate: [AuthGuard, MaintenanceGuard],
  },
  {
    path: 'edit-user',
    loadComponent: () => import('./edit-user/edit-user.component').then(m => m.EditUserComponent),
    canActivate: [AuthGuard, MaintenanceGuard],
  },
  {
    path: 'tickets',
    loadComponent: () => import('./tickets/tickets.component').then(m => m.TicketsComponent),
    canActivate: [AuthGuard, MaintenanceGuard],
  },
  {
    path: 'tickets/message',
    loadComponent: () => import('./tickets/ticket-view/ticket-view.component').then(m => m.TicketViewComponent),
    canActivate: [AuthGuard, MaintenanceGuard],
  },
  {
    path: 'wallet',
    loadComponent: () => import('./wallet/wallet.component').then(m => m.WalletComponent),
    canActivate: [AuthGuard, MaintenanceGuard],
  },
  {
    path: 'request-wallet',
    loadComponent: () => import('./request-wallet/request-wallet.component').then(m => m.RequestWalletComponent),
    canActivate: [AuthGuard, MaintenanceGuard],
  },
  {
    path: 'cart',
    loadComponent: () => import('./cart/cart.component').then(m => m.CartComponent),
    canActivate: [AuthGuard, MaintenanceGuard],
  },
  {
    path: 'products',
    loadComponent: () => import('./products/products.component').then(m => m.ProductsComponent),
    canActivate: [AuthGuard, MaintenanceGuard],
  },
  {
    path: 'trees',
    loadComponent: () => import('./unilevel-tree/page/view-unilevel-tree.component').then(m => m.ViewUnilevelTreeComponent),
    canActivate: [AuthGuard, MaintenanceGuard],
  },
  {
    path: 'academy',
    loadComponent: () => import('./academy/academy.component').then(m => m.AcademyComponent),
    canActivate: [AuthGuard, MaintenanceGuard],
  },
  {
    path: 'funding-account',
    loadComponent: () => import('./funding-accounts/funding-accounts.component').then(m => m.FundingAccountsComponent),
    canActivate: [AuthGuard, MaintenanceGuard],
  },
  {
    path: 'network-details',
    loadComponent: () => import('./network-details/network-details.component').then(m => m.NetworkDetailsComponent),
    canActivate: [AuthGuard, MaintenanceGuard],
  },
  {
    path: 'educational-courses',
    loadComponent: () => import('./educational-courses/educational-courses.component').then(m => m.EducationalCoursesComponent),
    canActivate: [AuthGuard, MaintenanceGuard],
  },
  {
    path: 'services-and-products',
    loadComponent: () => import('./services-and-products/services-and-products.component').then(m => m.ServicesAndProductsComponent),
    canActivate: [AuthGuard, MaintenanceGuard],
  },
  {
    path: 'exitojuntos',
    loadComponent: () => import('./savings-plans/savings-plans.component').then(m => m.SavingsPlansComponent),
    canActivate: [AuthGuard, MaintenanceGuard],
  },
  {
    path: 'savings-plans-one-b',
    loadComponent: () => import('./savings-plans-one-b/savings-plans-one-b.component').then(m => m.SavingsPlansOneBComponent),
    canActivate: [AuthGuard, MaintenanceGuard],
  },
  {
    path: 'purchase-confirmation',
    children: [
      {
        path: 'parametro1/:parametro1/parametro2/:parametro2',
        loadComponent: () => import('./purchase-confirmation/purchase-confirmation.component').then(m => m.PurchaseConfirmationComponent)
      },
      {
        path: ':parametro1/:parametro2',
        loadComponent: () => import('./purchase-confirmation/purchase-confirmation.component').then(m => m.PurchaseConfirmationComponent)
      }
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'activate-matrix',
    loadComponent: () => import('./cart/activate-matrix/activate-matrix.component').then(m => m.ActivateMatrixComponent),
    canActivate: [AuthGuard, MaintenanceGuard],
  },
];

