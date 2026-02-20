import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Service } from '../../services/service';
import { Observable } from 'rxjs';
import { Caption } from '../caption/caption';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, Caption],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private clientHttp = inject(Service);
}
