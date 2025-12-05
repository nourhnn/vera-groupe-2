import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SingleChoiceEntry {
  value: string;
  count: number;
}

export interface DailyCount {
  date: string;
  count: number;
}

// ✅ Version alignée avec ce que ton template utilise
export interface StatsOverview {
  trueCount: number;
  falseCount: number;
  totalCount: number;

  totalResponses: number;
  dailyCounts: DailyCount[];

  // ex : data.scales['satisfaction_vera'].avg
  scales: {
    [key: string]: {
      avg: number | null;
      count?: number;
      [key: string]: any;
    };
  };

  // ex : data.singleChoice['age_tranche']
  singleChoice: {
    [key: string]: SingleChoiceEntry[];
  };

  // ex : toEntryList(data.multiChoice['contenu_rs'] || {})
  multiChoice: {
    [key: string]: Record<string, number>;
  };

  // ex : this.overview()?.generatedAt
  generatedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private readonly http = inject(HttpClient);

  // 🔥 Direct Render
  private readonly baseUrl = 'https://vera-groupe-2.onrender.com/api';

  fetchOverview(): Observable<StatsOverview> {
    return this.http.get<StatsOverview>(`${this.baseUrl}/stats/overview`);
  }

  listenToStream(): Observable<StatsOverview> {
    return new Observable<StatsOverview>((subscriber) => {
      const source = new EventSource(`${this.baseUrl}/stats/stream`);

      source.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as StatsOverview;
          subscriber.next(data);
        } catch (e) {
          console.error('[StatsService] erreur parse stream', e);
        }
      };

      source.onerror = (err) => {
        console.error('[StatsService] stream error', err);
        source.close();
        subscriber.error(err);
      };

      return () => {
        source.close();
      };
    });
  }
}
