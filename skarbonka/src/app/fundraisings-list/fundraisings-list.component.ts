import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Fundraising} from "../_models/fundraising";
import {FundraisingService} from "../_services/fundraising.service";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-fundraisings-list',
  templateUrl: './fundraisings-list.component.html',
  styleUrls: ['./fundraisings-list.component.scss']
})
export class FundraisingsListComponent implements OnInit {

  @Input() fundraisings: Fundraising[];
  @Output() choosenFundraising = new EventEmitter<Fundraising>();
  @Input() editEnabled: Boolean = false;

  constructor(private fundraisingService: FundraisingService, private router: Router) { }

  ngOnInit(): void {
  }

  show(fundraising) {
    this.choosenFundraising.emit(fundraising);
     this.router.navigate(['/details']);
  }

  formatDate(date: Date) {
    return new DatePipe('en-US').transform(date, 'dd-MM-yyyy');
  }



  navigateToEdit(fundraising) {
    this.router.navigate([`edit-fundraising/${fundraising.id}`])
  }
}
