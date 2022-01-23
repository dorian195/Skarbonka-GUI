import {Component} from '@angular/core';
import {Fundraising} from "../_models/fundraising";
import {Category} from "../_models/category";
import {AuthService} from "../_services/auth.service";
import {FundraisingService} from "../_services/fundraising.service";
import {CategoryService} from "../_services/category.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  userId: number = 1;
  pageIndex: number = 0;
  fundraisings: Fundraising[];
  selectedFundraising: Fundraising = null;
  fundraisingsLength: number = 100;
  pageSizeOptions: number[] = [5, 10, 25];
  pageSize = 10;
  categories: Category[];

  radioData: any;
  searchInput: any;
  sortField: any;

  constructor(public authenticationService: AuthService,
              private fundraisingService: FundraisingService,
              private categoryService: CategoryService) {

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
    this.fundraisingService.getFundraisingsByUserId(this.userId, this.pageIndex, this.pageSize).subscribe(x => {
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

