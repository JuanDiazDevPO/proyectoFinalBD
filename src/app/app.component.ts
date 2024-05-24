import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  template: `
  <input [(ngModel)]="count" />
  {{ count }}

`,
})
export class AppComponent {
  title = 'frontBases';
}
