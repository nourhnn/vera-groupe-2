import { Component } from '@angular/core';
import { LangService } from '../../services/lang.service';

@Component({
  selector: 'app-equipe',
  standalone: true,
  templateUrl: './equipe.html',
  styleUrls: ['./equipe.css']
})
export class Equipe {

  constructor(public lang: LangService) {}

  t(key: string) {
    return this.lang.t(key);
  }

}
