import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"


interface MarkerAndColor {
   color: string;
   marker: Marker;
}

interface SmallMarker {
   color: string;
   lngLat: [number, number];
}

@Component({
  selector: 'app-frm-markers',
  templateUrl: './frm-markers.component.html',
  styleUrl: './frm-markers.component.css'
})
export class FrmMarkersComponent {

   @ViewChild('map')
   divMap?: ElementRef;

   public zoom: number = 10;
   public map?: Map;
   public currentLngLat: LngLat = new LngLat( -103.24806574304695, 20.618996961046264 );
   public markers: MarkerAndColor[] = [];

   ngAfterViewInit(): void {
      if ( !this.divMap ) throw 'El elemento HTML no fue encontrado';

      this.map = new Map({
         container: this.divMap.nativeElement, // container ID
         style: 'mapbox://styles/mapbox/streets-v12', // style URL
         center: this.currentLngLat, // starting position [lng, lat]
         zoom: 15, // starting zoom
      });

      // const marker = new Marker()
      //    .setLngLat( this.currentLngLat)
      //    .addTo( this.map );

      this.loadFromLocalStorage();
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
         draggable: true,
      })
         .setLngLat( lngLat )
         .addTo( this.map );

      this.markers.push({
         color: color,
         marker: marker
      });

      this.saveToLocalStorage();

      marker.on('dragend', () => {
         this.saveToLocalStorage();
      });
   }

   public deleteMarker( idx: number ): void {

      console.log('Eliminando marker: ', idx);


      this.markers[idx].marker.remove();
      this.markers.splice( idx, 1);

      this.saveToLocalStorage();
   }

   public flyTo( marker: Marker ): void {

      this.map?.flyTo({
         zoom: 14,
         center: marker.getLngLat()
      });

   }

   saveToLocalStorage() {

      const smallMarkers: SmallMarker[] = this.markers.map( ({color, marker}) => {

         // Yo tengo que regresar un objeto SmallMarker
         return {
            color: color,
            lngLat: [marker.getLngLat().lng, marker.getLngLat().lat],
         }

      })
      // console.log(this.markers);
      // console.log(smallMarkers);

      localStorage.setItem('smallMarkers', JSON.stringify(smallMarkers));
   }

   loadFromLocalStorage() {

      const smallMarkers: SmallMarker[] = JSON.parse(localStorage.getItem('smallMarkers') ?? '[]');
      // console.log(smallMarkers);
      smallMarkers.forEach( ({ color, lngLat }) => {
         const [lng, lat ] = lngLat;
         // console.log({lngLat});

         const coords: LngLat = new LngLat(lng , lat);

         this.addMarker(coords, color);
      });


   }

}
