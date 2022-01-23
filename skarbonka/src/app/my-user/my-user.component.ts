import {Component, OnInit} from '@angular/core';
import {Fundraising} from "../_models/fundraising";
import {FundraisingService} from "../_services/fundraising.service";
import {AuthService} from "../_services/auth.service";
import {PageEvent} from '@angular/material/paginator';
import {UserService} from "../_services/user.service";
import {User} from "../_models/user";
import {Subscription} from "rxjs";

import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-my-user',
  templateUrl: './my-user.component.html',
  styleUrls: ['./my-user.component.scss']
})
export class MyUserComponent implements OnInit {
  emailForm:FormGroup;
  phoneForm:FormGroup;
  currentUser: User;
  userSub: Subscription;
  example:any;
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthService,
              private userService: UserService,
              private fundraisingService: FundraisingService) {
    const token = JSON.parse(localStorage.getItem('token'));
    this.userService.getUserById(token.id).subscribe(x => {
      this.currentUser = x;
      console.log(this.currentUser);
    });
  }

  ngOnInit(): void {
    this.initData();
    this.emailForm = this.formBuilder.group({
      email: ['', Validators.email]
    });
  }
  Submit(){
    console.log('working');
  }
  pageIndex: number = 0;
  fundraisings: Fundraising[];
  selectedFundraising: Fundraising = null;
  fundraisingsLength: number=0;

  initData() {
    const token = JSON.parse(localStorage.getItem('token'));
    this.fundraisingService.getFundraisingsByUserId(token.id, this.pageIndex, 100).subscribe(x => {
      console.log(x.length);
      if(this.fundraisingsLength==0) {
        this.fundraisingsLength = x.length;
      }
    });
    this.fetchData();
  }

  onShow(showButtonClick){
    this.selectedFundraising = showButtonClick;
  }

  fetchData(): void {
    const token = JSON.parse(localStorage.getItem('token'));
    this.fundraisingService.getFundraisingsByUserId(token.id, this.pageIndex, 2).subscribe(x => {
      this.fundraisings = x;
    });
  }

  onPageFired(event?:PageEvent){
    console.log('aa');
    this.pageIndex=event.pageIndex;
    this.fetchData();
    return event;
  }
}

