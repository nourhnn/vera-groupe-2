import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangService } from '../../services/lang.service';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.html',
  styleUrls: ['./faq.css'],
})
export class FaqComponent {

  constructor(public lang: LangService) {}

}
