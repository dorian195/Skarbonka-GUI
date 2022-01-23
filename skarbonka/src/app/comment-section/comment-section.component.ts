import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {User} from "../_models/user";
import {Comment} from "../_models/comment";
import {AuthService} from "../_services/auth.service";
import {Fundraising} from "../_models/fundraising";
import {CommentService} from "../_services/comment.service";
import {InfoDialogComponent} from "../info-dialog/info-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {CommentRequest} from "../_models/comment-request";
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent implements OnInit {

  comment: Comment = new Comment();
  currentUser: User;
  comments: Comment[];
  commentsPageable: Comment[];
  commentAuthor: User;
  @Input() fundraising: Fundraising;
  pageSize: number
  pageIndex: number;

  constructor(private authenticationService: AuthService,
              public commentService: CommentService,
              private dialog: MatDialog,
              private changeDetector: ChangeDetectorRef) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    setInterval(() => this.changeDetector.markForCheck(), 500);
  }

  ngOnInit(): void {
    this.commentService.getCommentsByFundraisingId(this.fundraising.id, 0, 999).subscribe( x => {
      this.comments = x.reverse();
      this.commentsPageable = this.comments.slice(0, 3);
    });
  }

  sendComment() {
    let commentRequest = new CommentRequest();
    commentRequest.text = this.comment.text;
    commentRequest.fundraisingId = this.fundraising.id;
    this.commentService.addComment(commentRequest).subscribe(x => {
      if (x != undefined) {
        this.commentService.getCommentById(x.entityId).subscribe( x =>
        {
          this.comments.unshift(x);
          if(this.pageIndex === undefined || this.pageIndex === 0) {
            if (this.commentsPageable.length === 3) {
              this.commentsPageable.pop();
            }
            this.commentsPageable.unshift(x);
          }
        });
      }
      this.openInfoDialog('Dziękujemy za dodanie komentarza.');
    });
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

  onPageFired(event?: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.commentsPageable = this.comments.slice(this.pageIndex * this.pageSize, (this.pageIndex +1) * this.pageSize );
  }

}
