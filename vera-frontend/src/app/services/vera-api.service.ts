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

const DEFAULT_API_BASE_URL = 'http://localhost:3000/api';

function resolveApiBaseUrl(): string {
  const candidate =
    (window as any)?.NG_APP_API_BASE_URL ||
    (import.meta as any)?.env?.['NG_APP_API_BASE_URL'] ||
    (import.meta as any)?.env?.['NG_APP_API_URL'];

  const url =
    typeof candidate === 'string' && candidate.trim().length > 0 ? candidate : DEFAULT_API_BASE_URL;
  return url.replace(/\/$/, '');
}

@Injectable({
  providedIn: 'root',
})
export class VeraApiService {
  private baseUrl = resolveApiBaseUrl();

  constructor(private http: HttpClient) {}

  ask(question: string): Observable<VeraCheckResult> {
    return this.checkQuestion(question, 'chat');
  }

  checkQuestion(question: string, source: string = 'chat'): Observable<VeraCheckResult> {
    return this.http.post<VeraCheckResult>(`${this.baseUrl}/check`, {
      question,
      source,
    });
  }

  getQuestions(): Observable<VeraCheckResult[]> {
    return this.http.get<VeraCheckResult[]>(`${this.baseUrl}/questions`);
  }

  loginAdmin(email: string, password: string): Observable<{ success: boolean; token: string }> {
    return this.http.post<{ success: boolean; token: string }>(`${this.baseUrl}/auth/login`, {
      email,
      password,
    });
  }
}
