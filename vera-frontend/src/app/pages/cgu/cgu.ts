import { Component } from '@angular/core';
import { LangService } from '../../services/lang.service';

@Component({
  selector: 'app-cgu',
  templateUrl: './cgu.html',
  styleUrls: ['./cgu.css'],   // ← ICI le S + tableau
})
export class CguComponent {

  constructor(public lang: LangService) {}

}
