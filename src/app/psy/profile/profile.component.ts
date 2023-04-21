import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../service/token-storage.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {NotificationService} from "../../service/notification.service";
import {Client} from "../../models/Client";
import {Psychologist} from "../../models/Psychologist";
import {PsyService} from "../../service/psy.service";
import {EditPsyComponent} from "../edit-psy/edit-psy.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  // @ts-ignore
  psy: Psychologist;
  // @ts-ignore
  selectedFile: File;
  // @ts-ignore
  psyProfileImage: File;
  isPsyDataLoaded = false;
  previewImgURL: any;

  constructor(private tokenService: TokenStorageService,
              private psyService: PsyService,
              private dialog: MatDialog,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.psyService.getInfo()
      .subscribe(data=>{
        this.psy = data;
        this.psyProfileImage = data.photo;
        this.isPsyDataLoaded = true;
      });
  }

  onFileSelected(event: any): void{
    this.selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.previewImgURL = reader.result;
    };
  }

  openEditDialog(): void{
    const dialogPsyEditConfig = new MatDialogConfig();
    dialogPsyEditConfig.width = '400px';
    dialogPsyEditConfig.data = {
      psy: this.psy
    };
    this.dialog.open(EditPsyComponent, dialogPsyEditConfig);
  }

  formatImage(img: any): any{
    if(img == null){
      return null;
    }

    return 'data:image/jpeg;base64,' + img;
  }

  onUpload(): void{
    if(this.selectedFile != null){
      this.psyService.uploadPhoto(this.selectedFile)
        .subscribe(()=>{
          this.notificationService.showSnackBar('Profile Photo upload Successfully');
        })
    }
  }

}
