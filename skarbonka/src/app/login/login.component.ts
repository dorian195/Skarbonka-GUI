import {Component, OnInit} from '@angular/core';
import {AuthService} from "../_services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first, Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  subscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthService) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams[`returnUrl`] || '/';

    if (this.authenticationService.currentUserValue) {
      console.log(this.authenticationService.currentUserValue);
      this.router.navigate(['/']);
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f['email'].value, this.f['password'].value)
      .pipe(first())
      .subscribe(
        data => {

        },
        error => {
          this.error = error;
          this.loading = false;
        });

    this.subscription = this.authenticationService.currentUser.subscribe(x => {
      this.router.navigate([this.returnUrl]);
    });
  }

}
