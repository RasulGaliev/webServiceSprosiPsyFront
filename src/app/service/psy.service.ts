import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Appointment} from "../models/Appointment";
import {Psychologist} from "../models/Psychologist";

const PSY_API = 'http://localhost:8080/api/psy/'

@Injectable({
  providedIn: 'root'
})


export class PsyService {

  constructor(private http: HttpClient) { }

  getActiveAppointments(): Observable<any>{
    return this.http.get(PSY_API + 'appointments');
  }

  getAppointment(id: number): Observable<any>{
    return this.http.get(PSY_API + 'appointment/' + id);
  }

  cancelAppointment(id: number, appointment: Appointment): Observable<any>{
    return this.http.post(PSY_API + 'appointment/' + id, appointment);
  }

  getInfo(): Observable<any>{
    return this.http.get(PSY_API + 'myProfile');
  }

  editProfile(psy: Psychologist): Observable<any>{
    return this.http.post(PSY_API + 'editProfile', psy);
  }

  uploadPhoto(file: File): Observable<any>{
    const uploadData = new FormData();
    uploadData.append('photo', file);

    return this.http.post(PSY_API + 'uploadPhoto', uploadData)
  }

  deletePhoto(): Observable<any>{
    return this.http.post(PSY_API + 'deletePhoto', null)
  }

  addLinkToAppointment(id: number, link: string): Observable<any>{
    return this.http.post(PSY_API + 'appointment/' + id + '/addLink', link);
  }
}
