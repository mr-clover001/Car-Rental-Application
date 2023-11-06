import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './Component/Services/auth.service';
import { CarListService } from './Component/Services/car-list.service';

import { CarListComponent } from './Component/car-list/car-list.component';
import { AddCarDetailComponent } from './Component/add-car-detail/add-car-detail.component';
import { UpdateCarDetailComponent } from './Component/update-car-detail/update-car-detail.component';
import { UserRegisterComponent } from './Component/user-register/user-register.component';
import { LoginComponent } from './Component/login/login.component';
import { HeaderComponent } from './Component/header/header.component';
import { CarRentPageComponent } from './Component/car-rent-page/car-rent-page.component';
import { RentalAgreementAcceptanceComponent } from './Component/rental-agreement-acceptance/rental-agreement-acceptance.component';
import { EditRentalAgreementComponent } from './Component/edit-rental-agreement/edit-rental-agreement.component';
import { RentalAgreementPageComponent } from './Component/rental-agreement-page/rental-agreement-page.component';
import { HomePageComponent } from './Component/home-page/home-page.component';


@NgModule({
  declarations: [
    AppComponent,
    CarListComponent,
    AddCarDetailComponent,
    UpdateCarDetailComponent,
    UserRegisterComponent,
    LoginComponent,
    HeaderComponent,
    CarRentPageComponent,
    RentalAgreementAcceptanceComponent,
    EditRentalAgreementComponent,
    RentalAgreementPageComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    RouterModule
  ],
  providers: [
    CarListService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
