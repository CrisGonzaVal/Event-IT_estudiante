import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TalleresAsistidosPage } from './talleres-asistidos.page';

const routes: Routes = [
  {
    path: '',
    component: TalleresAsistidosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TalleresAsistidosPageRoutingModule {}
