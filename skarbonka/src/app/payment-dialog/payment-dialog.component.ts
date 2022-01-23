import {Component, Inject, OnInit} from '@angular/core';
import {FundraisingService} from "../_services/fundraising.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Fundraising} from "../_models/fundraising";
import {Donation} from "../_models/donation";
import {DonationService} from "../_services/donation.service";
import {InfoDialogComponent} from "../info-dialog/info-dialog.component";
import {AuthService} from "../_services/auth.service";
import {User} from "../_models/user";

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss']
})
export class PaymentDialogComponent implements OnInit {

  donation: Donation;
  currentUser: User;

  constructor(private fundraisingService: FundraisingService,
              private donationService: DonationService,
              private dialogRef: MatDialogRef<PaymentDialogComponent>,
              private dialog: MatDialog,
              private authenticationService: AuthService,
              @Inject(MAT_DIALOG_DATA) public data:{
                inputFundraising: Fundraising,
              }) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.donation = new Donation();

    if(!this.currentUser)
      this.donation.anonymous = true;
  }

  close() {
    this.dialogRef.close();
  }

  doPay(){
    this.donationService.addDonation(this.data.inputFundraising.id, this.donation).subscribe(x => {
      this.dialogRef.close(x.entityId);
      this.openInfoDialog('Dziękujemy za dokonanie wpłaty.');
    });
  }

  onToggleChange(event): void {
    this.donation.anonymous = !!event.checked;
  }

  openInfoDialog(message: string) {
    this.dialog.open(InfoDialogComponent,{
      data:{
        message: message,
        buttonText: {
          cancel: 'OK'
        }
      },
    });
  }
}
