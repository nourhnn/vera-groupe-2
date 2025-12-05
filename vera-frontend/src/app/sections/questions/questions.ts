import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangService } from '../../services/lang.service';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './questions.html',
  styleUrls: ['./questions.css']
})
export class QuestionsComponent {

  constructor(public lang: LangService) {}

}
