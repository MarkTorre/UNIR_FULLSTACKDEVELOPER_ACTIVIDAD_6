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
  pages: Array<IPage> = [IPAGE_INIT]; // Inicializamos el numero de paginas con una pagina predefinida.
  current_page: number = 0;


  ngOnInit(): void {
    this.clientHttp.getAllUsers( ).subscribe( (data:IPage)=> {
      this.pages.push(data)
      this.current_page = data.page; // Para que se muestre la primera página
      console.log(this.pages)
    })

  }
}
