import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, shareReplay, take} from "rxjs";
import {User} from "../_models/user";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private users$: Observable<User[]> = this.users.asObservable();
  private pending = false;

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<User> {
    const user$ = this.http.post<User>(`${environment.apiUrl}/users/register`, user).pipe(shareReplay());
    user$.pipe(take(1)).subscribe(x => {
      const users = this.users.value;
      users.unshift(x);
      this.users.next(users);
    });


    return user$;
  }

  passwordChanger(idUser: number,user:User): Observable<User> {
      return this.http.patch<User>(`${environment.apiUrl}/users/` + idUser, user);
    }

    getUserById(idUser: number): Observable<User> {
        return this.http.get<User>(`${environment.apiUrl}/users/` + idUser);
      }

}
