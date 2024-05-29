import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../common/local-storage.service';
import { QuestionResponse } from './question.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = "http://localhost:8080/test";
  private http: HttpClient = inject(HttpClient);
  private localStorageService = inject(LocalStorageService);

  constructor() { }

  sendMessage(message: String): Observable<QuestionResponse> {
    console.log('Message envoyé:', message);
    this.localStorageService.saveData(<string> message);
    return this.http.post<QuestionResponse>(this.apiUrl, { message });
  }
}
