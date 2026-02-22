import { IUser,IUSER_INIT } from './../../interfaces/iuser';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-caption',
  imports: [ RouterLink],
  templateUrl: './caption.html',
  styleUrl: './caption.css',
})
export class Caption {
  @Input() user:IUser = IUSER_INIT;
}
