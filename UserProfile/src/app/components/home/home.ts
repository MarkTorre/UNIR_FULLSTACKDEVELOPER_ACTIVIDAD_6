import { bootstrapApplication } from '@angular/platform-browser';
import { IPage, IPAGE_DEFAULT } from './../../interfaces/ipage';
import { Component, inject, OnInit, WritableSignal, signal} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Service } from '../../services/service';
import { Observable } from 'rxjs';
import { Caption, CaptionUserId } from '../caption/caption';
import { IUser, IUSER_DEFAULT } from '../../interfaces/iuser';
import { DeleteUserPopup, CSS_ID_MODAL } from '../delete-user-popup/delete-user-popup';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-home',
  imports: [RouterOutlet, Caption, DeleteUserPopup],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  // Constantes
  public readonly NO_PAGE: number = -1;
  // Servicios
  private clientHttp = inject(Service);
  // Propiedades
  pages: Array<Array<IUser>> =[[IUSER_DEFAULT]]
  current_page: WritableSignal<number> = signal<number>(this.NO_PAGE); // Current page es la propiedad que nos indica en que pagina estamos.
                                                                       // La he creado como signal para que cuando cambie su valor avise al bulce @for del html
                                                                       // de que debe ejecutarse de nuevo.
  caption_user: CaptionUserId = IUSER_DEFAULT; // Como CaptionUserId es un tipo Pick de IUser lo podemos inicializar directamente con IUSER_DEFAULT.

  ngOnInit(): void {
    this.getUsers();
    this.current_page.set(0);
  }

  getUsers(){
    this.pages = [];
    let final = 0
    this.clientHttp.getAllUsers( ).subscribe( (data:IPage) => {
      // Ordena los usuarios según su ID
      data.results.sort((a, b) => a.id - b.id);
      // Generamos un array con el número de usuarios por pagina que nos indica la API
      for(let i = 0; i < (data.total*data.total_pages); i += data.per_page){
        final = i+data.per_page;
        if(final <= data.total) {
          this.pages.push(data.results.slice(i, final))
        } else {
          this.pages.push(data.results.slice(i, data.total_pages))
          break;
        }
      }
      // Almacena los usuarios en cada pagina a mostrar
      this.triggerCurrentPage();
    })
  }

  changeCurrentPage($event: any) {
    this.current_page.set($event);
  }

  triggerCurrentPage() {
    const current = this.current_page()
    this.current_page.set(this.NO_PAGE)
    this.current_page.set(current)
  }

  deleteUserPopup($event:CaptionUserId) {
    this.caption_user = $event;
    const myModal = new bootstrap.Modal('#'+CSS_ID_MODAL);
    myModal.show();
  }
}
