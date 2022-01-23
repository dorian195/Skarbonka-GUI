import {Component, OnInit} from '@angular/core';
import {Fundraising} from "../_models/fundraising";
import {AuthService} from "../_services/auth.service";
import {FundraisingService} from "../_services/fundraising.service";

import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-funds-paginator',
  templateUrl: './funds-paginator.component.html',
  styleUrls: ['./funds-paginator.component.scss']
})
export class FundsPaginatorComponent implements OnInit {

  pageIndex: number = 0;
  fundraisings: Fundraising[];
  selectedFundraising: Fundraising = null;
  fundraisingsLength: number = 10;

  constructor(public authenticationService: AuthService,
              private fundraisingService: FundraisingService) {

  }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.fetchData();
  }

  onShow(showButtonClick) {
    this.selectedFundraising = showButtonClick;
  }

  fetchData(): void {
    const token = JSON.parse(localStorage.getItem('token'));
    this.fundraisingService.getFundraisingsByUserId(token.id, this.pageIndex, 2).subscribe(x => {
      this.fundraisings = x;
    });
  }

  onPageFired(event?: PageEvent) {
    console.log('aa');
    this.pageIndex = event.pageIndex;
    this.fetchData();
    return event;
  }
}
