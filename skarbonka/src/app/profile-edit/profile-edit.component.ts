import {Component, OnInit} from '@angular/core';
import {AuthService} from "../_services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {UserService} from "../_services/user.service";
import {User} from "../_models/user";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})

export class ProfileEditComponent implements OnInit {
  emailForm:FormGroup;
  phoneForm:FormGroup;
  currentUser: User;
  userSub: Subscription;
  example:any;
  birthday:any;
  constructor(private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private authenticationService: AuthService,
                private userService: UserService,
                public datePipe: DatePipe) {
  const token = JSON.parse(localStorage.getItem('token'));
  this.userService.getUserById(token.id).subscribe(x => {
    this.currentUser = x;
    this.birthday=this.datePipe.transform(this.currentUser.birthDate, 'dd/MM/yyyy');
    console.log(this.currentUser);
    });
   }

  ngOnInit(): void {
  this.emailForm = this.formBuilder.group({
        email: ['', Validators.email]
      });
  }
  Submit(){
    console.log('working');
  }
}
