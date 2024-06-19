import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

@Component({
  selector: 'app-frm-zoom-range',
  templateUrl: './frm-zoom-range.component.html',
  styleUrl: './frm-zoom-range.component.css'
})
export class FrmZoomRangeComponent implements AfterViewInit, OnDestroy {

   @ViewChild('map')
   divMap?: ElementRef;

   public zoom: number = 10;
   public map?: Map;
   public currentLngLat: LngLat = new LngLat( -103.24806574304695, 20.618996961046264 );

   ngOnDestroy(): void {
      // se remueven todos los listener
      this.map?.remove();
   }

   ngAfterViewInit(): void {
      if ( !this.divMap ) throw 'El elemento HTML no fue encontrado';

      this.map = new Map({
         container: this.divMap.nativeElement, // container ID
         style: 'mapbox://styles/mapbox/streets-v12', // style URL
         center: this.currentLngLat, // starting position [lng, lat]
         zoom: this.zoom, // starting zoom
      });

      this.mapListeners();
   }

   mapListeners() {
      if (!this.map) throw 'Mapa no inicializado';

      this.map.on('zoom', (event) => {
         // console.log(event);
         this.zoom = this.map!.getZoom();
      });

      this.map.on('zoomend', (event) => {

         if (this.map!.getZoom() < 18) return;

         this.map?.zoomTo(18);
      });

      this.map.on('move', event => {

         this.currentLngLat = this.map!.getCenter();
         // console.log(this.currentLngLat);
      });
   }

   zoomIn() {
      this.map?.zoomIn();
   }

   zoomOut() {
      this.map?.zoomOut();
   }

   zoomChanged( valor: string ): void {
      this.zoom = Number(valor);
      this.map?.zoomTo(this.zoom);
   }
}
