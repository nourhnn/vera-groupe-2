import { Component } from '@angular/core';
import { LangService } from '../../services/lang.service'; // ✅ IMPORT

@Component({
  selector: 'app-outil',
  standalone: true,
  templateUrl: './outil.html',
  styleUrls: ['./outil.css']
})
export class OutilComponent {

  constructor(public lang: LangService) {} // ✅ IMPORTANT

  t(key: string) {
    return this.lang.t(key);
  }
}
