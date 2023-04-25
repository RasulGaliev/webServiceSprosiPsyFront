import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit{
  // @ts-ignore
  code: string;
  // @ts-ignore
  check: boolean;

  constructor(private authService: AuthService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        console.log(params);
        this.code = params['code'];
      });

    this.authService.activation(this.code)
      .subscribe(data =>{
        console.log(data);
        this.check = data;
      })
  }
}
