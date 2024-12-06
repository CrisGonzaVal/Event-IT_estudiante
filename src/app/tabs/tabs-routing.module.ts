import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.homePageModule),
      },
      {
        path: 'editar-usuario',  // Añadir la ruta para editar-usuario
        loadChildren: () => import('../editar-usuario/editar-usuario.module').then(m => m.EditarUsuarioPageModule),
      },
      {
        path: 'talleres',
        loadChildren: () => import('../talleres/talleres.module').then( m => m.TalleresPageModule)
      },
      {
        path: 'lector-qr',
        loadChildren: () => import('../lector-qr/lector-qr.module').then(m => m.LectorQRPageModule),
      },
      {
        path: 'talleres-asistidos',
        loadChildren: () => import('../talleres-asistidos/talleres-asistidos.module').then( m => m.TalleresAsistidosPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
