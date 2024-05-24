import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MessageListComponent } from '../messages/message-list/message-list.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatService } from './chat.service';
import { LocalStorageService } from '../common/local-storage.service';
import { ChatResponse } from './chat.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MessageListComponent, ReactiveFormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    
  }

  chatForm = new FormControl<String>('');
  private chatService: ChatService = inject(ChatService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  ngOnInit(): void { }

  sendMessage(): void {
    if (!this.chatForm.value) {
      console.log('Message pas envoyé, le champs est vide');
      return;
    }
  
    this.chatService.sendMessage(this.chatForm.value).pipe(take(1)).subscribe({
      next: (v: ChatResponse) => {
        console.log("retour : " + v);
        this.localStorageService.saveData(<string> v.response);
      },
      error: (e) => console.error(e)
    });
    this.chatForm.setValue('');
  }

  
}

