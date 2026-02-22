import { IPage, IPAGE_INIT } from './../../interfaces/ipage';
import { Component, inject, OnInit} from '@angular/core';
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
  page: IPage = IPAGE_INIT;

  ngOnInit(): void {
    this.clientHttp.getAllUsers( ).subscribe( (data:IPage)=> {
      this.page = data;
      console.log(this.page)
    })

  }
}
