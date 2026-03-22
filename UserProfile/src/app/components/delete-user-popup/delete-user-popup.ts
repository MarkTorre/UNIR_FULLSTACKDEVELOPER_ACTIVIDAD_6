import { Component, inject, input} from '@angular/core';
import { Service } from '../../services/service';
import { Router } from '@angular/router';
import { IUser } from '../../interfaces/iuser';

export const CSS_ID_MODAL: string = "deleteUserPopup";
export const CSS_ARIA_LABELLY_BY: string = "deleteUserPopupLabel";

@Component({
  selector: 'app-delete-user-popup',
  imports: [],
  templateUrl: './delete-user-popup.html',
  styleUrl: './delete-user-popup.css',
})
export class DeleteUserPopup {
  private clientHttp = inject(Service);
  private router     = inject(Router);

  public readonly cssIdModal: string = CSS_ID_MODAL;
  public readonly cssAriaLabelledBy: string = CSS_ARIA_LABELLY_BY;

  //@Input() user_id: string = "";
  //@Input() user_name: string = "";
  public user_id   = input<string>("");
  public user_name = input<string>("");

  exitPopup($event:any) {
    // NOTA: Me encontré con que el navegador me reportaba el siguiente mensaje de warning: Blocked aria-hidden on an element because its descendant retained focus. The focus must not be hidden from assistive technology users. Avoid using aria-hidden on a focused element or its ancestor.
    // A través de la consola pude observar que el propio Bootstrap añade el atributo aria-hidden="true", pero entra en conflicto porque a su vez el foco está en el botón en el que se hace click.
    // Para solucionar esto llamo a la función blur(), de esta forma se quita el foco del botón antes de que bootstrap ponga aria-hidden="true".
    $event.currentTarget.blur();
  }

  async deleteUser() {
    try {
      let response: IUser = await this.clientHttp.deleteUser(this.user_id()); // Nota: Cambiar this.user_id para simular error

      if (!response.hasOwnProperty('error')) {
        console.log(`DELETE ${response.first_name}`);
      } else {
        console.log(`DELETE ERROR`);
      }
      console.log(response);
      await this.router.navigate(['/**']); // No se si es una forma muy burda de refrescar la página, pero es la forma más sencilla que he encontrado sin salirme del scope de lo que se enseña en clase. Pero me he encontrado que cuando borro un usuario al estar en la misma página el componente no se refresca y entonces no se ejecuta la petición para obtener todos los usuarios "nuevos actualizados".
      await this.router.navigate(['/home']);
    } catch (error) {
      console.log("DELETE ERROR");
      console.log(error)
    }
  }
}
