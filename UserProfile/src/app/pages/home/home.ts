import { IPage } from '../../interfaces/ipage';
import { Component, inject, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Service } from '../../services/service';
import { Caption, CaptionUserId } from '../../components/caption/caption';
import { IUser, IUSER_DEFAULT } from '../../interfaces/iuser';
import { DeleteUserPopup, CSS_ID_MODAL } from '../../components/delete-user-popup/delete-user-popup';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-home',
  imports: [RouterOutlet, Caption, DeleteUserPopup],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  public readonly NO_PAGE: number = -1;

  private clientHttp = inject(Service);

  pages: Array<Array<IUser>> =[[IUSER_DEFAULT]]
  current_page = signal<number>(this.NO_PAGE); // Current page es la propiedad que nos indica en que pagina estamos.
                                                                       // La he creado como signal para que cuando cambie su valor avise al bulce @for del html
                                                                       // de que debe ejecutarse de nuevo.
  caption_user: CaptionUserId = IUSER_DEFAULT; // Como CaptionUserId es un tipo Pick de IUser lo podemos inicializar directamente con IUSER_DEFAULT.

  async ngOnInit() {
    await this.getAllPages();
    this.current_page.set(0);
  }

  async getAllPages(){
    this.pages = [];

    try {
      // La primera petición nos dará información sobre las páginas
      const response: IPage = await this.getUsersPage(1);
      this.pages.push(response.results)

      // Generamos un array con el número de usuarios por página que nos indica la API
      for(let n_page = response.page+1; n_page <= (response.total_pages); n_page += response.per_page){
        const response: IPage = await this.getUsersPage(n_page);
        this.pages.push(response.results)
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getUsersPage(page: number): Promise<IPage> {
    try {
      // Obtenemos la página con todos sus usuarios
      const response: IPage = await this.clientHttp.getAllUsers(page);
      // Ordena la ista de usuarios según su ID
      response.results.sort((a, b) => a.id - b.id);
      console.log(`GET ALL USERS PAGE ${page}`);
      console.log(response)
      return response;
    } catch (error) {
      throw error;
    }
  }

  changeCurrentPage($event: number) {
    this.current_page.set($event);
  }

  deleteUserPopup($event:CaptionUserId) {
    this.caption_user = $event;
    const myModal = new bootstrap.Modal('#'+CSS_ID_MODAL);
    myModal.show();
  }
}
