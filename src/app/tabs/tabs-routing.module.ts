import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.homePageModule)
      },
      {
        path: 'lector-qr',
        loadChildren: () => import('../lector-qr/lector-qr.module').then(m => m.LectorQRPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: '/tabs/registrar',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: '/lector-qr',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: '/editar-contacto',
    pathMatch: 'full'
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
