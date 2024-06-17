import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { FrmFullScreenComponent } from './pages/frm-full-screen/frm-full-screen.component';
import { FrmMarkersComponent } from './pages/frm-markers/frm-markers.component';
import { FrmPropertiesComponent } from './pages/frm-properties/frm-properties.component';
import { FrmZoomRangeComponent } from './pages/frm-zoom-range/frm-zoom-range.component';

const routes: Routes = [
   {
      path: '',
      component: MapsLayoutComponent,
      children: [
         { path: 'fullscreen', component: FrmFullScreenComponent },
         { path: 'markers',    component: FrmMarkersComponent },
         { path: 'properties', component: FrmPropertiesComponent },
         { path: 'zoom-range', component: FrmZoomRangeComponent },
         { path: '**',         redirectTo: 'fullscreen' }
      ]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule { }
