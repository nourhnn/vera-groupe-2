import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VeraApiService, VeraCheckResult } from '../../services/vera-api.service';

interface Tweet {
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class ChatComponent {
  messages: {
    from: 'user' | 'vera' | 'tweets';
    text?: string;
    tweets?: Tweet[];
  }[] = [];

  userInput: string = '';
  isLoading = false;
  error: string | null = null;

  // Loader UX multi-étapes
  loadingSteps = [
    { key: 'analyze', label: 'Analyse de ta question' },
    { key: 'check', label: 'Vérification des faits' },
    { key: 'write', label: 'Rédaction de la réponse' },
  ];
  currentLoadingStep = 0;

  private loadingInterval: any | null = null;
  private safetyTimeout: any | null = null;

  constructor(private veraApi: VeraApiService) {}

  // -----------------------------------------------------
  // Envoi d’une question
  // -----------------------------------------------------
  sendMessage() {
    if (!this.userInput.trim() || this.isLoading) return;

    const question = this.userInput.trim();

    // Message user
    this.messages.push({
      from: 'user',
      text: question,
    });

    this.userInput = '';
    this.error = null;

    // Démarrer le loader UX
    this.startLoading();

    // Appel API Vera
    this.veraApi.ask(question).subscribe({
      next: (res: VeraCheckResult) => {
        this.stopLoading();

        // Afficher la réponse principale de Vera
        const veraText = res.isTrue
          ? `✔️ Cette affirmation semble correcte : ${res.reason}`
          : `❌ Cette affirmation est fausse : ${res.reason}`;

        this.messages.push({
          from: 'vera',
          text: veraText,
        });

        // Si l'affirmation est fausse → afficher les tweets mock
        if (!res.isTrue && res.tweets.length > 0) {
          const tweetObjects = res.tweets.map(t => ({
            author: "VeraBot",
            avatar: "https://i.pravatar.cc/40?img=12",
            content: t,
            timestamp: new Date().toLocaleString(),
          }));

          this.messages.push({
            from: 'tweets',
            tweets: tweetObjects,
          });
        }
      },

      error: (err: any) => {
        console.error(err);

        this.stopLoading();

        this.messages.push({
          from: 'vera',
          text: "❗ Une erreur est survenue. Je ne peux pas répondre pour le moment.",
        });

        this.error = "Erreur : l’API Vera ne répond pas.";
      },
    });
  }

  // -----------------------------------------------------
  // Loader UX multi-étapes
  // -----------------------------------------------------
  private startLoading() {
    this.isLoading = true;
    this.currentLoadingStep = 0;
    this.clearTimers();

    this.loadingInterval = setInterval(() => {
      if (!this.isLoading) return;
      if (this.currentLoadingStep < this.loadingSteps.length - 1) {
        this.currentLoadingStep++;
      }
    }, 2500);

    this.safetyTimeout = setTimeout(() => {
      this.stopLoading();
    }, 20000);
  }

  private stopLoading() {
    this.isLoading = false;
    this.clearTimers();
  }

  private clearTimers() {
    if (this.loadingInterval) {
      clearInterval(this.loadingInterval);
      this.loadingInterval = null;
    }
    if (this.safetyTimeout) {
      clearTimeout(this.safetyTimeout);
      this.safetyTimeout = null;
    }
  }

  // Nettoyage du composant
  ngOnDestroy(): void {
    this.clearTimers();
  }
}
