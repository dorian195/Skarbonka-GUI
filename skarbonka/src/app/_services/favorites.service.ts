import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Fundraising} from "../_models/fundraising";

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private http: HttpClient) { }

  addToFavorites(idUser: number, fundraisingId: number): Observable<Fundraising> {
    return this.http.post<Fundraising>(`${environment.apiUrl}/favorites?fundraisingId=` + fundraisingId +`&userId=` + idUser, {});
  }
}
