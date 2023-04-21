import {Component, OnInit} from '@angular/core';
import {Appointment} from "../../models/Appointment";
import {PsyService} from "../../service/psy.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{

  isAppointmentsLoaded = false;
  // @ts-ignore
  appointments: Appointment[];

  constructor(private psyService: PsyService) {
  }

  ngOnInit() {

    this.psyService.getActiveAppointments()
      .subscribe(data => {
        console.log(data);
        this.appointments = data;
        this.isAppointmentsLoaded = true;
      })

  }


}
