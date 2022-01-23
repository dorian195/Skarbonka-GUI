import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, skip} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Fundraising, URL} from "../_models/fundraising";
import {FundraisingCreateRequest} from "../_models/fundraising-create-request";
import {FundraisingEditRequest} from "../_models/fundraising-edit-request";

@Injectable({
  providedIn: 'root'
})
export class FundraisingService {
  private fundraisings: BehaviorSubject<Fundraising[]> = new BehaviorSubject<Fundraising[]>([]);
  private fundraisings$: Observable<Fundraising[]> = this.fundraisings.asObservable();

  private fundraising: BehaviorSubject<Fundraising> = new BehaviorSubject<Fundraising>(new Fundraising())
  private fundraising$: Observable<Fundraising> = this.fundraising.asObservable();

  private fundraisingCreateResult: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  private fundraisingCreateResult$: Observable<Boolean> = this.fundraisingCreateResult.asObservable();

  public currentFundraising: Fundraising;

  constructor(private http: HttpClient) {

  }

  public getCurrentFundraising(): Fundraising {
    return this.currentFundraising;
  }

  getFundraisings(page: Number, pageSize: Number, sort: boolean): Observable<Fundraising[]> {
    this.http.get<Fundraising[]>(`${environment.apiUrl}/fundraisings/all?page=${page}&pageSize=${pageSize}&sort=${sort}`).subscribe(x => {
      this.fundraisings.next(x);
    });
    this.loadImage()
    return this.fundraisings$;
  }

  getFundraisingsByNameAndVerifiedStatusAndCategory(category: String, name: String, page: Number, pageSize: Number, sort: boolean, sortField: String): Observable<Fundraising[]> {
    this.http.get<Fundraising[]>(`${environment.apiUrl}/fundraisings?category=${category}&name=${name}&page=${page}&pageSize=${pageSize}&sort=${sort}&sortField=${sortField}`).subscribe(x => {
      this.fundraisings.next(x);
    });
    this.loadImage()
    return this.fundraisings$;
  }
  getFundraisingsByUserId(userId: Number, page: Number, pageSize: Number): Observable<Fundraising[]> {
    this.http.get<Fundraising[]>(`${environment.apiUrl}/fundraisings/user?userId=${userId}&page=${page}&pageSize=${pageSize}&sort=false`).subscribe(x => {
      this.fundraisings.next(x);
    });
    this.loadImage();
    return this.fundraisings$;
  }

  public setCurrentFundraising(fundraising: Fundraising): void {
      this.currentFundraising = fundraising;
    }

  public setCurrentFundraisingNull(): void {
      this.currentFundraising = Object.create(null);
    }

    loadImage() {
      this.fundraisings.forEach(f => f.forEach(f => f.url = URL[this.getRandomInt(0, URL.length)]));
    }

    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }

  private createBearerAuthorizationHeader(tokenString: string) {
    return 'Bearer '+tokenString;
  }

  getFundraisingById(id: number): Observable<Fundraising> {
    this.http.get<Fundraising>(`${environment.apiUrl}/fundraisings/${id.toString()}`).subscribe(x=> {
      this.fundraising.next(x);
    })

    return this.fundraising$;
  }

  createFundraising(fundraisingCreateRequest: FundraisingCreateRequest, userToken: string): Observable<Boolean> {
    this.http.post(`${environment.apiUrl}/fundraisings`, fundraisingCreateRequest, {
      headers: {
        'Authorization': this.createBearerAuthorizationHeader(userToken)
      }
    }).subscribe(x => {
      this.fundraisingCreateResult.next(true);
  }, error => {
      this.fundraisingCreateResult.error(null);
    });

    return this.fundraisingCreateResult$;
  }

  updateFundraising(fundraising: Fundraising, userToken: string): Observable<Boolean> {

    const request: FundraisingEditRequest = new FundraisingEditRequest(
      fundraising.name,
      fundraising.description,
      fundraising.accountBalance,
      fundraising.category.id
    );

    this.http.post(`${environment.apiUrl}/fundraisings/modify/${fundraising.id}`, request, {
      headers: {
        'Authorization': this.createBearerAuthorizationHeader(userToken)
      }
    }).subscribe(x => {
      this.fundraisingCreateResult.next(true);
    }, error => {
      this.fundraisingCreateResult.error(null);
    });

    return this.fundraisingCreateResult.pipe(skip(1));
  }


  reportById(fundraisingId: number): Observable<Fundraising> {
    return this.http.post<Fundraising>(`${environment.apiUrl}/fundraisings/report/` + fundraisingId, {});
  }

}
