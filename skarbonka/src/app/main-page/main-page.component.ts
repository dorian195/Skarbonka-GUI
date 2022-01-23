import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../_services/auth.service";
import {Router} from "@angular/router";
import {Fundraising} from "../_models/fundraising";
import {FundraisingService} from "../_services/fundraising.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  fundraisings: Fundraising[];
  selectedFundraising: Fundraising = null;
  @Output() emitter = new EventEmitter<Fundraising>();


  constructor(private router: Router,
              public authenticationService: AuthService,
              private fundraisingService: FundraisingService) {

  }

  ngOnInit(): void {
    this.fundraisingService.getFundraisings(0,10, true).subscribe(x => {
      this.fundraisings = x;
    });
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }

  onShow(showButtonClick){
    this.selectedFundraising = showButtonClick;
    this.fundraisingService.setCurrentFundraising(showButtonClick);
  }

}
