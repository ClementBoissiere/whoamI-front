import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { PortraitComponent } from './portrait/portrait.component';
import { ChatComponent } from './chat/chat.component';
import { ResponseComponent } from './response/response.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PortraitComponent, ChatComponent, ResponseComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'whoami';
}
