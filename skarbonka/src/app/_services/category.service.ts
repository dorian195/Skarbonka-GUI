import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Category} from "../_models/category";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  private categories$: Observable<Category[]> = this.categories.asObservable();

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<Category[]> {
    if (this.categories.value.length === 0) {
      this.http.get<Category[]>(`${environment.apiUrl}/categories/all`).subscribe(x => {
        this.categories.next(x);
      });
    }
    return this.categories$;
  }

}
