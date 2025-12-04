import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  VeraApiService,
  VeraCheckResult,
} from '../../services/vera-api.service';
import { SurveyStatsComponent } from './survey-stats.component'; // ✅ nouveau

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, SurveyStatsComponent], // ✅ ajouté ici
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {
  questions: VeraCheckResult[] = [];
  error: string | null = null;

  selectedSource: 'all' | 'chat' | 'tiktok' | 'other' = 'all';
  selectedTruth: 'all' | 'true' | 'false' = 'all';

  constructor(
    private veraApi: VeraApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('[Dashboard] ngOnInit');

    // 🔒 Protection admin → si pas connecté = redirection
    const token = localStorage.getItem('vera_admin_token');
    if (!token) {
      this.router.navigate(['/admin-login']);
      return;
    }

    // Charger les données
    this.loadQuestions();
  }

  // 🔁 Recharge les questions depuis l'API
  loadQuestions(): void {
    this.veraApi.getQuestions().subscribe({
      next: (data: VeraCheckResult[]) => {
        console.log('[Dashboard] données reçues :', data);
        this.questions = data;
      },
      error: (err: any) => {
        console.error('[Dashboard] erreur API :', err);
        this.error = "Impossible de charger l'historique.";
      },
    });
  }

  // 🔎 Filtres dynamiques
  get filteredQuestions(): VeraCheckResult[] {
    return this.questions.filter((q) => {
      let okSource = true;
      let okTruth = true;

      if (this.selectedSource === 'chat') okSource = q.source === 'chat';
      else if (this.selectedSource === 'tiktok') okSource = q.source === 'tiktok';
      else if (this.selectedSource === 'other')
        okSource = q.source !== 'chat' && q.source !== 'tiktok';

      if (this.selectedTruth === 'true') okTruth = q.isTrue === true;
      else if (this.selectedTruth === 'false') okTruth = q.isTrue === false;

      return okSource && okTruth;
    });
  }

  // 📊 Statistiques
  get totalCount(): number {
    return this.questions.length;
  }

  get trueCount(): number {
    return this.questions.filter((q) => q.isTrue).length;
  }

  get falseCount(): number {
    return this.questions.filter((q) => !q.isTrue).length;
  }

  get truePercent(): number {
    if (this.totalCount === 0) return 0;
    return Math.round((this.trueCount / this.totalCount) * 100);
  }

  get falsePercent(): number {
    if (this.totalCount === 0) return 0;
    return Math.round((this.falseCount / this.totalCount) * 100);
  }

  // 🚪 Déconnexion admin
  logout(): void {
    localStorage.removeItem('vera_admin_token');
    this.router.navigate(['/admin-login']);
  }
}
