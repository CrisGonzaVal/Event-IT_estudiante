import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutorizadoGuard } from './guards/autorizado.guard';
import { disableMenuGuard } from './guards/menu.guard';
import { enableMenuGuard } from './guards/menu.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',  // Página principal de inicio
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.loginPageModule),
    canActivate: [disableMenuGuard] // Desactiva el menú aquí
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule), // Cargar el módulo de tabs
    canActivate: [AutorizadoGuard,enableMenuGuard]
  },
  // Otras rutas que no están relacionadas con las tabs
  {
    path: 'registrar',
    loadChildren: () => import('./registrar/registrar.module').then(m => m.RegistrarPageModule),
    canActivate: [disableMenuGuard] // Desactiva el menú aquí
  },
  {
    path: 'editar-usuario',
    loadChildren: () => import('./editar-usuario/editar-usuario.module').then(m => m.EditarUsuarioPageModule),
    canActivate: [AutorizadoGuard]
  },
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}