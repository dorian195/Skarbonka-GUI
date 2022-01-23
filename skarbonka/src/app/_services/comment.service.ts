import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Comment} from "../_models/comment";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CommentRequest} from "../_models/comment-request";
import {EntityResponse} from "../_models/entity-response";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private comments: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>([]);
  private comments$: Observable<Comment[]> = this.comments.asObservable();

  constructor(private http: HttpClient) { }

  getCommentsByFundraisingId(idFundraising: number, page: number, pageSize: number): Observable<Comment[]> {
      this.http.get<Comment[]>(`${environment.apiUrl}/comments?fundraisingId=` + idFundraising + `&page=` + page +`&size=`+ pageSize).subscribe(x => {
        this.comments.next(x);
      });
    return this.comments$;
  }

  addComment(comment: CommentRequest): Observable<EntityResponse> {
    return this.http.post<EntityResponse>(`${environment.apiUrl}/comments`, comment);
  }

  getCommentById(idComment: number): Observable<Comment> {
    return this.http.get<Comment>(`${environment.apiUrl}/comments/` + idComment);
  }

}
