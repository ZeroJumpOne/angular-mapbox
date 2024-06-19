import { Component } from '@angular/core';
import { CounterAloneComponent } from '../../components/counter-alone/counter-alone.component';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';

@Component({
  selector: 'frm-alone',
  standalone: true,
  imports: [CounterAloneComponent, SideMenuComponent],
  templateUrl: './frm-alone.component.html',
  styleUrl: './frm-alone.component.css'
})
export class FrmAloneComponent {

}
