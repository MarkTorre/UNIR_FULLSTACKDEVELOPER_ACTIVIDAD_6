import { CaptionUserId } from '../../components/caption/caption';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser, IUSER_DEFAULT } from '../../interfaces/iuser';
import { Service } from '../../services/service';
import { Component, inject, input, signal} from '@angular/core';
import { DeleteUserPopup, CSS_ID_MODAL } from '../../components/delete-user-popup/delete-user-popup';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-profile',
  imports: [DeleteUserPopup],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  private clientHttp = inject(Service);
  private router     = inject(Router)

  public readonly id = input<string>();   // Recibe automáticamente el :id de la URL
  public user        = signal<IUser>(IUSER_DEFAULT);

  async ngOnInit(): Promise<void> {
    const url_id = this.id();
    if(url_id){
      try {
        let response: IUser = await this.clientHttp.getUserById(url_id);
        this.user.set(response);
      } catch (error) {
        console.log(error);
      }
    }
  }

  routeToHome() {
    this.router.navigate(['/'])
  }

  routeToUpdateUser() {
    this.router.navigate(["/updateuser", this.user()._id])
  }

  deleteUserPopup() {
    const myModal = new bootstrap.Modal('#'+CSS_ID_MODAL);
    myModal.show();
  }

}
