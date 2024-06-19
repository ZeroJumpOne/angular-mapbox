import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor {
   color: string;
   marker: Marker;
}

@Component({
  selector: 'mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit {

   @ViewChild('map')
   divMap?: ElementRef;

   @Input()
   LngLat: [number, number] = [-103.24806574304695, 20.618996961046264];

   public map?: Map;
   // public currentLngLat: LngLat = new LngLat( -103.24806574304695, 20.618996961046264 );
   public marker?: MarkerAndColor;

   ngAfterViewInit(): void {
      if ( !this.divMap!.nativeElement ) throw "Map Div not found";
      if ( !this.LngLat ) throw "LngLat can't be null";

      //mapa
      this.map = new Map({
         container: this.divMap!.nativeElement, // container ID
         style: 'mapbox://styles/mapbox/streets-v12', // style URL
         center: this.LngLat, // starting position [lng, lat]
         zoom: 10, // starting zoom
         interactive: false,
      });

      //marker
      this.createMarker();
   }

   createMarker() {
      if ( !this.map ) return;

      const color  = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
      const lgnLat = this.map.getCenter();

      this.addMarker( lgnLat, color );
   }

   addMarker( lngLat: LngLat, color: string ) {
      if(!this.map) return;

      const marker = new Marker({
         color: color,
         draggable: false,
      })
         .setLngLat( lngLat )
         .addTo( this.map );

      this.marker = {
         color: color,
         marker: marker
      };

      // this.saveToLocalStorage();

      // marker.on('dragend', () => {
      //    this.saveToLocalStorage();
      // });
   }

}
