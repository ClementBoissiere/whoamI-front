import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { LocalStorageService } from '../common/local-storage.service';
import { QuestionResponse } from './question.model';
import { ChatService } from './question.service';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent {

  chatForm = new FormGroup({
    chatQuestion: new FormControl<String>('', Validators.required)
  });
  private chatService: ChatService = inject(ChatService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  ngOnInit(): void { }

  sendMessage(): void {
    const question = this.chatForm.get('chatQuestion')?.value;

    if (!question) {
      console.log('Message pas envoyé, le champs est vide');
      return;
    }

    this.chatService.sendMessage(question).pipe(take(1)).subscribe({
      next: (v: QuestionResponse) => {
        console.log("retour : " + v);
        this.localStorageService.saveData(<string>v.response);
      },
      error: (e) => console.error(e)
    });
    this.chatForm.get('chatQuestion')?.setValue('');
  }
}
