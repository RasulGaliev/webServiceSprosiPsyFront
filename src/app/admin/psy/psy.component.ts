import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../service/admin.service";
import {NotificationService} from "../../service/notification.service";
import {PsysComponent} from "../psys/psys.component";
import {Psychologist} from "../../models/Psychologist";
import {ActivatedRoute} from "@angular/router";
import {Certificate} from "../../models/Certificate";

@Component({
  selector: 'app-psy',
  templateUrl: './psy.component.html',
  styleUrls: ['./psy.component.css']
})
export class PsyComponent implements OnInit{

  // @ts-ignore
  psy: Psychologist;
  // @ts-ignore
  id: number;
  isPsyLoaded = false;

  previewImgURL: any;
  // @ts-ignore
  psyProfileImage: File;
  // @ts-ignore
  certificates: Certificate[];

  constructor(private adminService: AdminService,
              private notificationService: NotificationService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        console.log(params);
        this.id = params['id'];
      });

    this.adminService.getPsy(this.id)
      .subscribe(data => {
        console.log(data);
        this.psy = data;
        this.isPsyLoaded = true;
      })
  }

  changeStatus(): void{
    this.psy.status = !this.psy.status;
    this.adminService.changeStatus(this.id, this.psy)
      .subscribe(data => {
        console.log(data);
      });
  }

  formatImage(img: any): any{
    if(img == null){
      return null;
    }

    return 'data:image/jpeg;base64,' + img;
  }
}
