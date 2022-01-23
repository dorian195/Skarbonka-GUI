import {Component, OnInit} from '@angular/core';
import {AuthService} from "../_services/auth.service";

import {Fundraising} from "../_models/fundraising";
import {Category} from "../_models/category";
import {FundraisingService} from "../_services/fundraising.service";
import {CategoryService} from "../_services/category.service";
import {PageEvent} from "@angular/material/paginator";
import {User} from "../_models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {

  // constructor(private formBuilder: FormBuilder,
  //                 private route: ActivatedRoute,
  //                 private router: Router,
  //                 private authenticationService: AuthService) {
  //     }
  //
  //   ngOnInit(): void {
  //   }


  pageIndex: number = 0;
  fundraisings: Fundraising[];
  selectedFundraising: Fundraising = null;
  fundraisingsLength: number = 100;
  pageSizeOptions: number[] = [5, 10, 25];
  pageSize = 10;
  categories: Category[];
  currentUser: User;

  radioData: any;
  searchInput: any;
  sortField: any;

  constructor(public authenticationService: AuthService,
              private fundraisingService: FundraisingService,
              private router: Router,
              private categoryService: CategoryService) {
    if (!this.authenticationService.currentUserValue) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(x => {
      this.categories = x;
    });
    this.fetchData();
  }

  onShow(showButtonClick) {
    this.selectedFundraising = showButtonClick;
  }

  fetchData(): void {
    const token = JSON.parse(localStorage.getItem('token'));
    this.fundraisingService.getFundraisingsByUserId(token.id, this.pageIndex, this.pageSize).subscribe(x => {
      this.fundraisings = x;
    });
  }

  onPageFired(event?: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchData();
    return event;
  }
}
