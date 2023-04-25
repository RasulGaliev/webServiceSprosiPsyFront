import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public registerForm: FormGroup = this.createRegisterForm();
  // @ts-ignore
  selectedFile: File;
  // @ts-ignore
  certificates: number[] = [0];
  previewImgURL: any;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {
  }

  createRegisterForm(): FormGroup {
    return this.fb.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      confirmedPassword: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
    });
  }

  submit(): void {
    console.log(this.registerForm.value);

    this.authService.register({
      name: this.registerForm.value.name,
      login: this.registerForm.value.email,
      password: this.registerForm.value.password,
      confirmedPassword: this.registerForm.value.confirmedPassword,
      description: this.registerForm.value.description,
      certificates: this.certificates
    }).subscribe(data => {
      console.log(data);
      this.notificationService.showSnackBar('Successfully Registered!');
    }, error => {
      this.notificationService.showSnackBar('Something went wrong during registration');
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

  formatImage(img: any): any{
    if(img == null){
      return null;
    }

    return 'data:image/jpeg;base64,' + img;
  }

  onUpload(): void{
    if(this.selectedFile != null){
      this.authService.createCertificate(this.selectedFile)
        .subscribe(data=>{
          console.log(data);
          if (this.certificates[0] == 0) {
            this.certificates.splice(0, this.certificates.length);
          }
          this.certificates.push(data.id);
          this.notificationService.showSnackBar('Certificate successful added');
        })
    }
  }
}
