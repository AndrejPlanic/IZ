import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatbotService {
  private apiUrl = 'http://localhost:5000/api/ask';

  constructor(private http: HttpClient) {}

  askQuestion(question: string): Promise<string> {
    return firstValueFrom(
      this.http.post<{ answer: string }>(this.apiUrl, { question })
    ).then((res) => res.answer || 'Nema odgovora.');
  }
}
