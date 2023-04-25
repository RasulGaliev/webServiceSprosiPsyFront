import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {AuthGuardService} from "./helper/auth-guard.service";
import {IndexComponent} from "./layout/index/index.component";
import {ProfileComponent} from "./psy/profile/profile.component";
import {PsysComponent} from "./admin/psys/psys.component";
import {PsyComponent} from "./admin/psy/psy.component";
import {ActivationComponent} from "./auth/activation/activation.component";
import {AppointmentComponent} from "./layout/appointment/appointment.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'activate/:code', component: ActivationComponent},
  {path: 'main', component: IndexComponent, canActivate: [AuthGuardService]},
  {
    path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]
    // children: [
    //   {path: '', component: ClientAppointmentsComponent, canActivate: [AuthGuardService]},
    //   {path: 'finishedApps', component: FinishedAppointmentsComponent, canActivate: [AuthGuardService]}
    // ]
  },
  {path: 'admin', component: PsysComponent, canActivate: [AuthGuardService]},
  {path: 'admin/psy/:id', component: PsyComponent, canActivate: [AuthGuardService]},
  {path: 'appointment/:id', component: AppointmentComponent, canActivate: [AuthGuardService]},
  {path: '', redirectTo: 'main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
