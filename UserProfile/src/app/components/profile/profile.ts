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

  deleteUser() {
    this.clientHttp.deleteUser(this.user()._id).subscribe((data) => {
      this.router.navigate(['/'])
    })
  }
}
