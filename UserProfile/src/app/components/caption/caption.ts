import { IUser,IUSER_DEFAULT } from './../../interfaces/iuser';
import { Component, input, output} from '@angular/core';
import { RouterLink } from '@angular/router';

export type CaptionUserId = Pick<IUser, "_id" | "first_name">

@Component({
  selector: 'app-caption',
  imports: [ RouterLink],
  templateUrl: './caption.html',
  styleUrl: './caption.css',
})
export class Caption {
  public readonly user   = input<IUser>(IUSER_DEFAULT)
  public readonly delete = output<CaptionUserId>()

  deleteUser() {
    this.delete.emit({_id:this.user()._id, first_name: this.user().first_name})
  }
}
