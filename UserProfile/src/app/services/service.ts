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

  getAllUsers(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url);
  }

  getUserById(id: number): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url+`${id}`);
  }

  createNewUser(user: IUser): Observable<any> {
    return this.httpClient.post<any>(this.url,user);
  }

  updateUser(id: number, firstname: string, username: string): Observable<any> {
    const userToUpdate = {"first_name": firstname, "username":username};
    return this.httpClient.put(this.url+`${id}`, userToUpdate);
  }

  deleteUser(id: number): Observable<any[]> {
    return this.httpClient.delete<any[]>(this.url+`${id}`);
  }


}
