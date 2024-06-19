import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

@Component({
   selector: 'app-frm-full-screen',
   templateUrl: './frm-full-screen.component.html',
   styleUrl: './frm-full-screen.component.css'
})
export class FrmFullScreenComponent implements AfterViewInit {

   @ViewChild('map')
   divMap?: ElementRef;

   ngAfterViewInit(): void {
      if ( !this.divMap ) throw 'El elemento HTML no fue encontrado';

      const map = new Map({
         container: this.divMap.nativeElement, // container ID
         style: 'mapbox://styles/mapbox/streets-v12', // style URL
         center: [-103.238698, 20.613687], // starting position [lng, lat]
         zoom: 9, // starting zoom
      });
   }

}
