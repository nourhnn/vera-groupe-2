import { Component } from '@angular/core';
import { LangService } from '../../services/lang.service';

@Component({
  selector: 'app-fact-checking',
  standalone: true,
  imports: [],
  templateUrl: './fact-checking.html',
  styleUrls: ['./fact-checking.css']
})
export class FactChecking {

  constructor(public lang: LangService) {}

  t(key: string) {
    return this.lang.t(key);
  }
}
