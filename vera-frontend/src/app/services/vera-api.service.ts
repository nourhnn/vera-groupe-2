import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface VeraCheckResult {
  id: number;
  question: string;
  source: string;
  isTrue: boolean;
  reason: string;
  tweets: string[];
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class VeraApiService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Pour le chat classique
  ask(question: string): Observable<VeraCheckResult> {
    return this.checkQuestion(question, 'chat');
  }

  // Méthode générique
  checkQuestion(question: string, source: string = 'chat'): Observable<VeraCheckResult> {
    return this.http.post<VeraCheckResult>(`${this.baseUrl}/api/check`, { question, source });
  }

  getQuestions(): Observable<VeraCheckResult[]> {
    return this.http.get<VeraCheckResult[]>(`${this.baseUrl}/api/questions`);
  }
}
