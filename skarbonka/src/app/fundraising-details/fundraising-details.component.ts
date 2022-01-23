import {Component, Input, OnInit} from '@angular/core';
import {Fundraising} from "../_models/fundraising";
import {FundraisingService} from "../_services/fundraising.service";
import {User} from "../_models/user";
import {UserService} from "../_services/user.service";
import {Router} from "@angular/router";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {FavoritesService} from "../_services/favorites.service";
import {InfoDialogComponent} from "../info-dialog/info-dialog.component";
import {PaymentDialogComponent} from "../payment-dialog/payment-dialog.component";
import {DonationService} from "../_services/donation.service";
import {Donation} from "../_models/donation";
import {DatePipe} from "@angular/common";
import {AuthService} from "../_services/auth.service";
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-fundraising-details',
  templateUrl: './fundraising-details.component.html',
  styleUrls: ['./fundraising-details.component.scss']
})
export class FundraisingDetailsComponent implements OnInit {

  choosenFundraising: Fundraising = null;
  @Input() selectedFundraising: Fundraising;
  user: User;
  dateLeft: number;
  newDialog: MatDialogRef<PaymentDialogComponent>;
  currentUser: User;
  donations: Donation[] = [];
  donationsPageable: Donation[] = [];
  accountBalance: number;
  pageIndex:number;
  pageSize: number;

  constructor(public fundraisingService: FundraisingService,
              public userService: UserService,
              private favService: FavoritesService,
              private authenticationService: AuthService,
              public donationService: DonationService,
              private router: Router, private dialog: MatDialog) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.checkIsFundraising();
    this.choosenFundraising = this.fundraisingService.getCurrentFundraising();
    this.fundraisingService.setCurrentFundraisingNull();

    this.accountBalance = this.choosenFundraising.accountBalance;
    this.userService.getUserById(this.choosenFundraising.user.id).subscribe(x => {
      this.user = x;
    });
    this.dateLeft = this.calculateDiff(this.choosenFundraising.endDate)
    this.donationService.getDonationsByFundraisingId(this.choosenFundraising.id, 0, 999, true).subscribe( x => {
      this.donations = x;
      this.donationsPageable = this.donations.slice(0, 6);
    });
  }

  checkIsFundraising(): void {
    if (this.fundraisingService.getCurrentFundraising() === undefined) {
      this.router.navigate(['/']);
    }
  }

  calculateDiff(dateSent: Date) {
    let currentDate = new Date();
    dateSent = new Date(dateSent);
    let difference = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) / (1000 * 60 * 60 * 24));

    return Math.abs(difference);
  }

  addToFavorites() {
    const token = JSON.parse(localStorage.getItem('token'));
    this.favService.addToFavorites(token.id, this.choosenFundraising.id).subscribe(x => {
      this.openInfoDialog('Zbiórka została dodana do ulubionych.');
    });
  }

  report() {
    this.fundraisingService.reportById(this.choosenFundraising.id).subscribe(x => {
      this.openInfoDialog('Twoje zgłoszenie przebiegło pomyślnie.');
    });
  }

  openInfoDialog(message: string) {
    const dialogRef = this.dialog.open(InfoDialogComponent,{
      data:{
        message: message,
        buttonText: {
          cancel: 'OK'
        }
      },
    });
  }

  openPaymentDialog(): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '300px';
    dialogConfig.width = '400px';
    dialogConfig.data = {
      inputFundraising: this.choosenFundraising,
    }
    this.newDialog = this.dialog.open(PaymentDialogComponent, dialogConfig);

    this.newDialog.afterClosed().subscribe(record => {
      if (record != undefined) {
        this.donationService.getDonationById(record).subscribe( x=>
        {
          this.donations.unshift(x);
          this.accountBalance += x.ammount;
          if(this.pageIndex === undefined || this.pageIndex === 0){
            if(this.donationsPageable.length === 6) {
              this.donationsPageable.pop();
            }
            this.donationsPageable.unshift(x);
          }
        });
      }
    })
  }

  formatDate(date: Date) {
    return new DatePipe('en-US').transform(date, 'dd-MM-yyyy');
  }


  onPageFired(event?: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.donationsPageable = this.donations.slice(this.pageIndex * this.pageSize, (this.pageIndex +1) * this.pageSize );
  }

}
