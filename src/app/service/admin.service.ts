import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {provideRoutes} from "@angular/router";

const ADMIN_API = 'http://localhost:8080/api/admin/'

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getFalsePsys(): Observable<any>{
    return this.http.get(ADMIN_API + 'notConfirmedPsys');
  }

  getTruePsys(): Observable<any>{
    return this.http.get(ADMIN_API + 'confirmedPsys');
  }

  getPsy(id: number): Observable<any>{
    return this.http.get(ADMIN_API + 'psy/' + id);
  }

  changeStatus(id: number, psy: any): Observable<any>{
    return this.http.post(ADMIN_API + 'psy/' + id, psy);
  }
}
