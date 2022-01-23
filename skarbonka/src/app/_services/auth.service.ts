import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {User} from "../_models/user";
import {environment} from "../../environments/environment";
import {Token} from "../_models/token";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    if (!this.isUserLoggedIn)  // make sure to delete data from previous login
      localStorage.removeItem('token');
    const token: Token = JSON.parse(localStorage.getItem('token') || '{}');
    if(token != null){
      this.currentUserSubject = new BehaviorSubject(token.id);
    }
    else
      this.currentUserSubject = new BehaviorSubject(null);

    this.currentUser = this.currentUserSubject.asObservable();
  }
  //
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get isUserLoggedIn() {

    const token: Token = JSON.parse(localStorage.getItem('token') || '{}');
    return token;
  }

  login(email: string, password: string) {
    return this.http.post<Token>(`${environment.apiUrl}/users/login`, { email, password })
      .pipe(map(token => {

        localStorage.setItem('token', JSON.stringify(token));
        this.currentUserSubject.next(token.id);
        return token;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }


  onUserUpdated(user: User) {
    this.currentUserSubject.next(user);
  }
}
