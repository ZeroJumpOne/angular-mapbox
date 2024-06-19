import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrmAloneComponent } from './alone/pages/frm-alone/frm-alone.component';

const routes: Routes = [
   {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module').then( m => m.MapsModule ),
   },
   {
      path: 'alone',
      loadComponent: () => import('./alone/pages/frm-alone/frm-alone.component').then( c => c.FrmAloneComponent),
   },
   {
      path: '**',
      redirectTo: 'maps',
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
