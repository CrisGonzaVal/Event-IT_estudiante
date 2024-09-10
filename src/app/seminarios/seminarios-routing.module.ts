import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeminariosPage } from './seminarios.page';

const routes: Routes = [
  {
    path: '',
    component: SeminariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeminariosPageRoutingModule {}
