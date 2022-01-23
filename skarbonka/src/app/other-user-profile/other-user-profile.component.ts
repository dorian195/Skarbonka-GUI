import {Component, OnInit} from '@angular/core';
import {UserService} from "../_services/user.service";
import {FundraisingService} from "../_services/fundraising.service";

@Component({
  selector: 'app-other-user-profile',
  templateUrl: './other-user-profile.component.html',
  styleUrls: ['./other-user-profile.component.scss']
})
export class OtherUserProfileComponent implements OnInit {

  firstName: String = '';
  lastName: String = '';
  fundraisingsLength: number = 0;

  constructor(private userService: UserService,
              private fundraisingService: FundraisingService) {
  }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.userService.getUserById(1).subscribe(x => {
      if (this.firstName === '') {
        this.firstName = x.firstName;
        this.lastName = x.lastName;
      }
    });
    this.fundraisingService.getFundraisingsByUserId(1, 0, 100).subscribe(x => {
      if (this.fundraisingsLength == 0) {
        this.fundraisingsLength = x.length;
      }
    });
  }

}
