import { Component } from '@angular/core';
import { LangService } from '../../services/lang.service';

@Component({
  selector: 'app-comment-marche',
  templateUrl: './comment-marche.html',
  styleUrls: ['./comment-marche.css']
})
export class CommentMarcheComponent {
  constructor(public lang: LangService) {}
}
