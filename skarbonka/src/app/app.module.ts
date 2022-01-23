import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {RouterModule} from "@angular/router";
import {MatDividerModule} from "@angular/material/divider";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from "@angular/material/card";
import {MainPageComponent} from './main-page/main-page.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FundraisingsListComponent} from './fundraisings-list/fundraisings-list.component';
import {AuthInterceptor} from "./_helpers/auth-interceptor";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {FundraisingDetailsComponent} from './fundraising-details/fundraising-details.component';
import {InfoDialogComponent} from './info-dialog/info-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {PaymentDialogComponent} from './payment-dialog/payment-dialog.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {CommentSectionComponent} from './comment-section/comment-section.component';
import {HttpErrorInterceptor} from "./_helpers/error.interceptor";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {RulesComponent} from './rules/rules.component';
import {ProfileEditComponent} from './profile-edit/profile-edit.component';
import {PasswordChangerComponent} from './password-changer/password-changer.component';
import {MyListComponent} from './my-list/my-list.component';
import {MatGridListModule} from '@angular/material/grid-list';

import {UserComponent} from './user/user.component';

import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {CreateFundraisingComponent} from './create-fundraising/create-fundraising.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MyUserComponent} from './my-user/my-user.component';
import {CatalogComponent} from './catalog/catalog.component';
import {MatOptionModule} from "@angular/material/core";
import {MatRadioModule} from "@angular/material/radio";
import {FundsPaginatorComponent} from "./funds-paginator/funds-paginator.component";
import {OtherUserProfileComponent} from "./other-user-profile/other-user-profile.component";
import {EditFundraisingComponent} from './edit-fundraising/edit-fundraising.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ProfileEditComponent,
    MainPageComponent,
    FundraisingsListComponent,
    FundraisingDetailsComponent,
    InfoDialogComponent,
    PaymentDialogComponent,
    CommentSectionComponent,
    FundraisingsListComponent,
    RulesComponent,
    UserComponent,
    PasswordChangerComponent,
    MyListComponent,
    CreateFundraisingComponent,
    EditFundraisingComponent,
    MyUserComponent,
    FundsPaginatorComponent,
    OtherUserProfileComponent,
    CatalogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    RouterModule.forRoot([
      // {path: '', redirectTo: '/main', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'rules', component: RulesComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'profileedit', component: ProfileEditComponent},
      {path: 'password-changer', component: PasswordChangerComponent},
      {path: 'my-list', component: MyListComponent},
      {path: 'user', component: UserComponent},
      {path: 'my-user', component: MyUserComponent},
      {path: 'catalog', component: CatalogComponent},
      {path: '', component: MainPageComponent},
      {path: 'details', component: FundraisingDetailsComponent},
      { path: 'create-fundraising', component: CreateFundraisingComponent },
      { path: 'edit-fundraising/:id', component: EditFundraisingComponent }
    ]),
    MatDividerModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule,
    FlexLayoutModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatOptionModule,
    MatSelectModule,
    MatRadioModule,
    MatGridListModule,
    MatRadioModule
  ],
  providers: [DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
