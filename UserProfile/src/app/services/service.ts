import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPage } from '../interfaces/ipage';
import { IUser } from '../interfaces/iuser';
import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root',
})
export class Service {
  private httpClient = inject(HttpClient);
  private url = 'https://peticiones.online/api/users'

  getAllUsers(): Observable<IPage> {
    return this.httpClient.get<IPage>(this.url);
  }

  getUserById(id: number): Observable<IUser> {
    return this.httpClient.get<IUser>(this.url+`${id}`);
  }

  createNewUser(user: IUser): Observable<IUser> {
    return this.httpClient.post<IUser>(this.url,user);
  }

  updateUser(id: number, firstname: string, username: string): Observable<IUser> {
    const userToUpdate = {"first_name": firstname, "username":username};
    return this.httpClient.put<IUser>(this.url+`${id}`, userToUpdate);
  }

  deleteUser(id: number): Observable<IUser> {
    return this.httpClient.delete<IUser>(this.url+`${id}`);
  }


}
