import { ActivatedRoute, Router } from '@angular/router';
import { IUser, IUSER_DEFAULT } from '../../interfaces/iuser';
import { Service } from './../../services/service';
import { Component, inject, signal} from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  private profile_id = inject(ActivatedRoute);
  private clientHttp = inject(Service);
  private router     = inject(Router)

  public  user = signal<IUser>(IUSER_DEFAULT);

  ngOnInit(): void {
    this.profile_id.params.subscribe(params => {
      const id: string = params['id'];
      this.clientHttp.getUserById(id).subscribe( ( data:IUser ) => {
        this.user.set(data);
      })
    })
  }

  routeToHome() {
    this.router.navigate(['/'])
  }

  routeToUpdateUser() {
    this.router.navigate(["/updateuser", this.user()._id])
  }

  cancelBootstrapModal($event:any) {
    // NOTA: Me encontré con que el navegador me reportaba el siguiente mensaje de warning: Blocked aria-hidden on an element because its descendant retained focus. The focus must not be hidden from assistive technology users. Avoid using aria-hidden on a focused element or its ancestor.
    // A través de la consola pude observar que el propio Bootstrap añade el atributo aria-hidden="true", pero entra en conflicto porque a su vez el foco está en el botón en el que se hace click.
    // Para solucionar esto llamo a la función blur(), de esta forma se quita el foco del botón antes de que bootstrap ponga aria-hidden="true".
    $event.currentTarget.blur();

  }

  deleteUser() {
    this.clientHttp.deleteUser(this.user()._id).subscribe((data) => {
      this.router.navigate(['/'])
    })
  }
}
