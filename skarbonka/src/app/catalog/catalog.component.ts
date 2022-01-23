import {Component, OnInit} from '@angular/core';
import {Fundraising} from "../_models/fundraising";
import {AuthService} from "../_services/auth.service";
import {FundraisingService} from "../_services/fundraising.service";

import {PageEvent} from '@angular/material/paginator';
import {Category} from "../_models/category";
import {CategoryService} from "../_services/category.service";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

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
    this.fundraisingService.setCurrentFundraising(showButtonClick);
  }

  search() {//category, name, sort, sortField
    this.fundraisingService.getFundraisingsByNameAndVerifiedStatusAndCategory(this.radioData, this.searchInput, this.pageIndex, this.pageSize, true, this.sortField).subscribe(x => {
      this.fundraisings = x;
    });
  }

  fetchData(): void {
    this.fundraisingService.getFundraisingsByNameAndVerifiedStatusAndCategory('', '', this.pageIndex, this.pageSize, false, 'NEWEST').subscribe(x => {
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
