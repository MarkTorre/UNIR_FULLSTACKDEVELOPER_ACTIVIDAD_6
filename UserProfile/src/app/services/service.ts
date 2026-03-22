import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPage } from '../interfaces/ipage';
import { IUser } from '../interfaces/iuser';
import { lastValueFrom, Observable } from 'rxjs'

export type RequestUpdateUser = Pick<IUser, "first_name" | "username">
export type RequestNewUser = Pick<IUser, "first_name" | "last_name" | "email" | "username" | "password">

@Injectable({
  providedIn: 'root',
})
export class Service {
  private httpClient = inject(HttpClient);
  private url = 'https://peticiones.online/api/users'

  getAllUsers(page: number): Promise<IPage> {
    return lastValueFrom(this.httpClient.get<IPage>(this.url+`/?page=${page}`));
  }

  getUserById(id: string): Promise<IUser> {
    return lastValueFrom(this.httpClient.get<IUser>(this.url+`/${id}`));
  }

  createNewUser(user: RequestNewUser): Promise<IUser> {
    return lastValueFrom(this.httpClient.post<IUser>(this.url, user));
  }

  updateUser(id: string, user: RequestUpdateUser): Promise<IUser> {
    return lastValueFrom(this.httpClient.put<IUser>(this.url+`/${id}`, user));
  }

  deleteUser(id: string): Promise<IUser> {
    return lastValueFrom(this.httpClient.delete<IUser>(this.url+`/${id}`));
  }
}
