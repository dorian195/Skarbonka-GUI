import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Donation} from "../_models/donation";
import {EntityResponse} from "../_models/entity-response";

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  private donations: BehaviorSubject<Donation[]> = new BehaviorSubject<Donation[]>([]);
  private donations$: Observable<Donation[]> = this.donations.asObservable();

  constructor(private http: HttpClient) { }

  getDonationsByFundraisingId(idFundraising: number, page: number, pageSize: number, sort: boolean): Observable<Donation[]> {
      this.http.get<Donation[]>(`${environment.apiUrl}/donations?fundraisingId=` + idFundraising + `&page=` + page +`&pageSize=`+ pageSize +`&sort=`+ sort).subscribe(x => {
        this.donations.next(x);
      });
    return this.donations$;
  }

  addDonation(fundraisingId: number, donation: Donation): Observable<EntityResponse> {
    return this.http.post<EntityResponse>(`${environment.apiUrl}/donations?fundraisingId=` + fundraisingId, donation);
  }

  getDonationById(idDonation: number): Observable<Donation> {
    return this.http.get<Donation>(`${environment.apiUrl}/donations/` + idDonation);
  }

}
