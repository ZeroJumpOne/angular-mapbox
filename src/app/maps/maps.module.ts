import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsRoutingModule } from './maps-routing.module';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { FrmFullScreenComponent } from './pages/frm-full-screen/frm-full-screen.component';
import { FrmMarkersComponent } from './pages/frm-markers/frm-markers.component';
import { FrmPropertiesComponent } from './pages/frm-properties/frm-properties.component';
import { FrmZoomRangeComponent } from './pages/frm-zoom-range/frm-zoom-range.component';

@NgModule({
  declarations: [
    MiniMapComponent,
    SideMenuComponent,
    MapsLayoutComponent,
    FrmFullScreenComponent,
    FrmMarkersComponent,
    FrmPropertiesComponent,
    FrmZoomRangeComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule,
  ]
})
export class MapsModule { }
