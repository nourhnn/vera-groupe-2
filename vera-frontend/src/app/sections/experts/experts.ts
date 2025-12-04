import { Component } from '@angular/core';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { LangService } from '../../services/lang.service';

@Component({
  selector: 'app-experts',
  standalone: true,
  imports: [NgIf, NgFor, NgClass],
  templateUrl: './experts.html',
  styleUrl: './experts.css',
})
export class Experts {

  constructor(public lang: LangService) {}

  t(path: string) {
    return this.lang.t(path);
  }

}
