import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { PopupComponent } from './components/popup/popup.component';
import { CompetitionTableComponent } from './components/tables/competition-table/competition-table.component';
import { MembersTableComponent } from './components/tables/members-table/members-table.component';
import { AddHuntingComponent } from './components/add-hunting/add-hunting.component';
import { PodiumComponent } from './components/podium/podium.component';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './NGRX/auth.reducer';
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER } from "@taiga-ui/core";
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CustomInterceptor } from './interceptor/costum.interceptor';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { MemberDashboardComponent } from './pages/member-dashboard/member-dashboard.component';
import { JuryDashboardComponent } from './pages/jury-dashboard/jury-dashboard.component';
import { JuryTableComponent } from './components/tables/jury-table/jury-table.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    AdminDashboardComponent,
    PodiumComponent,
    AddHuntingComponent,
    MembersTableComponent,
    CompetitionTableComponent,
    PopupComponent,
    LoginComponent,
    AdminDashboardComponent,
    HomeComponent,
    MemberDashboardComponent,
    JuryDashboardComponent,
    JuryTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ auth: authReducer }),
    BrowserAnimationsModule,
    TableModule,
    TagModule,
    DropdownModule,
    MultiSelectModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule
],
  providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}