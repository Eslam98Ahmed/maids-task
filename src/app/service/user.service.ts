import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 apiUrl:string = 'https://reqres.in/api'

  constructor(private http:HttpClient) { }

  // get All Users List By page Number
  getUsers(page: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users?page=${page}`);
  }

  // get User Information By User Id
  getUserInfo(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${id}`);
  }

}
