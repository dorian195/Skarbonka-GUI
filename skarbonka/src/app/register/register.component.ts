import {Component, OnInit} from '@angular/core';
import {User} from "../_models/user";
import {take} from "rxjs";
import {UserService} from "../_services/user.service";
import {Router} from "@angular/router";
import {AuthService} from "../_services/auth.service";
import {InfoDialogComponent} from "../info-dialog/info-dialog.component";
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user:User = new User();
  genders: String[] = [
    "Kobieta", "Mężczyzna"
  ];

  constructor(private userService: UserService, private router: Router,
              private authenticationService: AuthService, private dialog: MatDialog) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

  isValidAge(birthDate: any, minAge: any) {
    let y=birthDate.toString().substr(0,4);
    let m=birthDate.toString().substr(5,2);
    let d=birthDate.toString().substr(8,2);
    let actualAge = this.calculateAge(m,d,y);
    return (actualAge >= minAge);
  }
  calculateAge(MM: any, DD: any, YYYY: any) {
    let now = new Date();
    let tday = now.getDate();
    let tmo = now.getMonth();
    let tyr = now.getFullYear();
    let age = tyr - YYYY;
    tmo = tmo + 1;
    if (tmo < MM) {
      age--;
    }
    if (MM === tmo && tday < DD) {
      age--;
    }
    return age;
  }

  submit() {
    if(!this.isValidAge(this.user.birthDate,18)) {
      this.openDialog("Musisz mieć skończone 18 lat aby założyć konto");
    }
    this.userService.registerUser(this.user).pipe(take(1)).subscribe(x => {
    });
    this.openDialog("Dziękujemy za założenie konta.");
  }

  openDialog(message: string) {
    this.dialog.open(InfoDialogComponent,{
      data:{
        message: message,
        buttonText: {
          cancel: 'OK'
        }
      },
    });
  }
}
