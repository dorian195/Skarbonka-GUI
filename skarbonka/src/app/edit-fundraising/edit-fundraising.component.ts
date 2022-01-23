import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FundraisingService} from "../_services/fundraising.service";
import {Fundraising} from "../_models/fundraising";
import {Category} from "../_models/category";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../_services/auth.service";
import {CategoryService} from '../_services/category.service';

@Component({
  selector: 'app-edit-fundraising',
  templateUrl: './edit-fundraising.component.html',
  styleUrls: ['./edit-fundraising.component.scss']
})
export class EditFundraisingComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private fundraisingService: FundraisingService,
    authenticationService: AuthService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    if (!authenticationService.currentUserValue) {
      this.router.navigate(['/login']);
    }
  }

  editFundraisingForm: FormGroup;

  fundraisingId = -1;

  categories: Category[] = [];
  fundraisingNameFormControl = new FormControl({ value: null, disabled: true });

  get f() { return this.editFundraisingForm.controls; }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      categories => { this.categories = categories }
    )

    this.editFundraisingForm  = this.formBuilder.group({
      fundraisingName: ['', Validators.required],
      fundraisingAmount: ['', Validators.required],
      fundraisingDescription: ['', Validators.required],
      fundraisingCategory: ['', Validators.required]
    });

    this.fundraisingNameFormControl.disable();

    this.route.params.subscribe( params => {
      const id = params['id'];
      this.fundraisingId = id;
      this.fundraisingService.getFundraisingById(id).subscribe(x => {
        this.f['fundraisingName'].setValue(x.name);
        this.f['fundraisingAmount'].setValue(x.accountBalance);
        this.f['fundraisingDescription'].setValue(x.description);
        this.f['fundraisingCategory'].setValue(x.category);
      });
    }
  );


  }

  onSubmit(): void {
    if(this.editFundraisingForm.invalid) {
      return;
    }
    const token = JSON.parse(localStorage.getItem('token'));
    const userId = +token.id;
    const fundraising = new Fundraising();

    fundraising.id = this.fundraisingId;
    fundraising.name  =this.f['fundraisingName'].value;
    fundraising.accountBalance = this.f['fundraisingAmount'].value;
    fundraising.description = this.f['fundraisingDescription'].value;
    fundraising.category = this.f['fundraisingCategory'].value;
    fundraising.user.id = userId;
    this.fundraisingService.updateFundraising(fundraising, token.token).subscribe(_=> {
      this.router.navigate(['/my-list']);
    });
    }
}
