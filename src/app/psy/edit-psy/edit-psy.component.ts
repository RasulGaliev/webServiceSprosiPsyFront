import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../service/notification.service";
import {PsyService} from "../../service/psy.service";
import {Psychologist} from "../../models/Psychologist";

@Component({
  selector: 'app-edit-psy',
  templateUrl: './edit-psy.component.html',
  styleUrls: ['./edit-psy.component.css']
})
export class EditPsyComponent {
  // @ts-ignore
  public profileEditForm: FormGroup;


  constructor(private dialogRef: MatDialogRef<EditPsyComponent>,
              private fb: FormBuilder,
              private notificationService: NotificationService,
              // @ts-ignore
              @Inject(MAT_DIALOG_DATA) public data,
              private psyService: PsyService
  ) {
  }

  ngOnInit() {
    this.profileEditForm = this.createProfileForm();
  }

  createProfileForm(): FormGroup{
    return this.fb.group({
      name: [
        this.data.name,
        Validators.compose([Validators.required])
      ]
    })
  }

  submit(): void{
    this.psyService.editProfile(this.updatePsy())
      .subscribe(() => {
        this.notificationService.showSnackBar('Psy updated successfully');
        this.dialogRef.close();
      });
  }

  private updatePsy(): Psychologist{
    this.data.psy.name = this.profileEditForm.value.name;
    return this.data.psy;
  }

  closeDialog(): void{
    this.dialogRef.close();
  }
}
