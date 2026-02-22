import { ActivatedRoute } from '@angular/router';
import { IUser, IUSER_DEFAULT } from '../../interfaces/iuser';
import { Service } from './../../services/service';
import { Component, inject} from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  profile_id = inject(ActivatedRoute);
  clientHttp = inject(Service);
  user: IUser = IUSER_DEFAULT;

  ngOnInit(): void {
    this.profile_id.params.subscribe(params => {
      const id: string = params['id'];
      this.clientHttp.getUserById(id).subscribe( ( data:IUser ) => {
        this.user = data;
      })
    })

  }
}
