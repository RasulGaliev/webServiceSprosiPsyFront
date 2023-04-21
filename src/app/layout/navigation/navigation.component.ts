import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../service/token-storage.service";
import {Router} from "@angular/router";
import {PsyService} from "../../service/psy.service";
import {Psychologist} from "../../models/Psychologist";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{
  isLoggedIn = false;
  isDataLoaded = false;

  // @ts-ignore
  psy: Psychologist;

  constructor(private tokenService: TokenStorageService,
              private psyService: PsyService,
              private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();

    if(this.isLoggedIn) {
      this.psyService.getInfo()
        .subscribe(data => {
          console.log(data);
          this.psy = data;
          this.isDataLoaded = true;
        })
    }
  }

  logout(): void {
    this.tokenService.logOut();
    this.router.navigate(['/login']);
  }


}
