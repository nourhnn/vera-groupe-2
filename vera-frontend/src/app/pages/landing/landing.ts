import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeroComponent } from '../../sections/hero/hero';
import { OutilComponent } from '../../sections/outil/outil'; 
import { CommentMarcheComponent } from '../../sections/comment-marche/comment-marche';
import { QuestionsComponent } from '../../sections/questions/questions';
import { FactChecking } from '../../sections/fact-checking/fact-checking';
import { TeamComponent } from '../../sections/team/team';
import { Equipe } from '../../sections/equipe/equipe';
import { Experts } from '../../sections/experts/experts';
import { FaqComponent } from '../../sections/faq/faq';
import { Footer } from '../../components/footer/footer';




@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NavbarComponent, HeroComponent,  OutilComponent, CommentMarcheComponent, QuestionsComponent, FactChecking, TeamComponent, Equipe, Experts, FaqComponent, Footer ],
  template: `
    <app-navbar></app-navbar>
    <app-hero></app-hero>
    <app-outil></app-outil>
    <app-comment-marche></app-comment-marche>
    <app-questions></app-questions>
    <app-fact-checking></app-fact-checking>
    <app-team></app-team>
    <app-equipe></app-equipe>
    <app-experts></app-experts>
    <app-faq></app-faq>
    <app-footer></app-footer>

    `
})
export class LandingComponent {}
