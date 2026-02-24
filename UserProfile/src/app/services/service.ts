import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPage } from '../interfaces/ipage';
import { IUser } from '../interfaces/iuser';
import { Observable } from 'rxjs'

export type RequestUpdateUser = Pick<IUser, "first_name" | "username">
export type RequestNewUser = Pick<IUser, "first_name" | "last_name" | "email" | "username" | "password">

@Injectable({
  providedIn: 'root',
})
export class Service {
  private httpClient = inject(HttpClient);
  private url = 'https://peticiones.online/api/users'

  getAllUsers(): Observable<IPage> {
    return this.httpClient.get<IPage>(this.url);
  }

  getUserById(id: string): Observable<IUser> {
    return this.httpClient.get<IUser>(this.url+`/${id}`);
  }

  createNewUser(user: RequestNewUser): Observable<IUser> {
    return this.httpClient.post<IUser>(this.url, user);
  }

  updateUser(id: string, user: RequestUpdateUser): Observable<IUser> {
    return this.httpClient.put<IUser>(this.url+`/${id}`, user);
  }

  deleteUser(id: string): Observable<IUser> {
    return this.httpClient.delete<IUser>(this.url+`/${id}`);
  }


}
