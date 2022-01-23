import {Component, OnInit} from '@angular/core';
import {AuthService} from "../_services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-password-changer',
  templateUrl: './password-changer.component.html',
  styleUrls: ['./password-changer.component.scss']
})
export class PasswordChangerComponent implements OnInit {

  changerForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
                  private route: ActivatedRoute,
                  private router: Router,
                  private authenticationService: AuthService) {
      }

    ngOnInit(): void {
    }
}
