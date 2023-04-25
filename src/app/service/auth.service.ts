import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Psychologist} from "../models/Psychologist";

const AUTH_API = 'http://localhost:8080/api/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(psy: any): Observable<any>{
    return this.http.post(AUTH_API + 'login', {
      username: psy.username,
      password: psy.password
    });
  }

  public register(psy: any): Observable<any>{
    return this.http.post(AUTH_API + 'reg', psy);
  }

  public createCertificate(file: File): Observable<any>{
    const uploadData = new FormData();
    uploadData.append('certificate', file);

    return this.http.post(AUTH_API + 'createCertificate', uploadData)
  }

  public activation(code: string): Observable<any>{
    return this.http.get(AUTH_API + 'activate/' + code);
  }
}
