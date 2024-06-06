import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { QuestionResponse } from '../question/question.model';

@Injectable({
  providedIn: 'root'
})
export class PersonalityService {

  private baseUrl = "http://localhost:8080";
  private http: HttpClient = inject(HttpClient);
  constructor() { }

  getPersonnalityOfTheDay() {
    const url = this.baseUrl + "/personality";
    return this.http.get<QuestionResponse>(url);
  }

  getLastPersonality() {
    const url = this.baseUrl + "/lastPersonality";
    return this.http.get<QuestionResponse>(url);
  }
}
