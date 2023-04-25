import {Component, OnInit} from '@angular/core';
import {PsyService} from "../../service/psy.service";
import {NotificationService} from "../../service/notification.service";
import {ActivatedRoute} from "@angular/router";
import {identity} from "rxjs";
import {Appointment} from "../../models/Appointment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit{
  // @ts-ignore
  id: number;
  // @ts-ignore
  appointment: Appointment;
  // @ts-ignore
  link: string;
  // @ts-ignore
  public linkForm: FormGroup;

  constructor(private psyService: PsyService,
              private notificationService: NotificationService,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(data =>{
        this.id = data['id'];
        console.log(this.id);
      });

    this.psyService.getAppointment(this.id)
      .subscribe(data =>{
        console.log(data);
        this.appointment = data;
      });

    this.linkForm = this.addLinkForm();
  }

  addLinkForm(): FormGroup{
    return this.fb.group({
      link: ['', Validators.compose([Validators.required])]
    })
  }

  public submit(){
    this.psyService.addLinkToAppointment(this.id, this.linkForm.value.link)
      .subscribe(data => {
        console.log(data);
      });
  }
}
