import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FundraisingService} from "../_services/fundraising.service";
import {Category} from "../_models/category";
import {Router} from "@angular/router";
import {AuthService} from "../_services/auth.service";
import {CategoryService} from '../_services/category.service';
import {FundraisingCreateRequest} from "../_models/fundraising-create-request";

@Component({
  selector: 'app-create-fundraising',
  templateUrl: './create-fundraising.component.html',
  styleUrls: ['./create-fundraising.component.scss']
})
export class CreateFundraisingComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private fundraisingService: FundraisingService,
    authenticationService: AuthService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    if (!authenticationService.currentUserValue) {
      this.router.navigate(['/login']);
    }
  }

  createFundraisingForm: FormGroup;

  categories: Category[] = [];

  get f() { return this.createFundraisingForm.controls; }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      categories => { this.categories = categories }
    )

    this.createFundraisingForm  = this.formBuilder.group({
      fundraisingName: ['', Validators.required],
      fundraisingAmount: ['', Validators.required],
      fundraisingExpirationDate: ['', Validators.required],
      fundraisingDescription: ['', Validators.required],
      fundraisingCategory: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if(this.createFundraisingForm.invalid) {
      return;
    }
    const token = JSON.parse(localStorage.getItem('token'));
    const userId = +token.id;
    const fundraisingCreateRequest = new FundraisingCreateRequest(
      this.f['fundraisingName'].value,
      this.f['fundraisingDescription'].value,
      this.f['fundraisingAmount'].value,
      this.f['fundraisingExpirationDate'].value,
      this.f['fundraisingCategory'].value
    );
    this.fundraisingService.createFundraising(fundraisingCreateRequest, token.token).subscribe(_=> {
      this.router.navigate(['/']);
    });
    }
}
