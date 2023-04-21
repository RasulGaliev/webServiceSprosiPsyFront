import {Component, OnInit} from '@angular/core';
import {Psychologist} from "../../models/Psychologist";
import {PsyService} from "../../service/psy.service";
import {NotificationService} from "../../service/notification.service";
import {AdminService} from "../../service/admin.service";

@Component({
  selector: 'app-psys',
  templateUrl: './psys.component.html',
  styleUrls: ['./psys.component.css']
})
export class PsysComponent implements OnInit{
  // @ts-ignore
  psys: Psychologist[];
  isPsysLoaded = false;

  constructor(private adminService: AdminService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.adminService.getFalsePsys()
      .subscribe(data => {
        console.log(data);
        this.psys = data;
        this.isPsysLoaded = true;
      })
  }



}
