import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarListComponent } from './Component/car-list/car-list.component';
import { AddCarDetailComponent } from './Component/add-car-detail/add-car-detail.component';
import { UpdateCarDetailComponent } from './Component/update-car-detail/update-car-detail.component';
import { CarRentPageComponent } from './Component/car-rent-page/car-rent-page.component';

import { UserRegisterComponent } from './Component/user-register/user-register.component';
import { LoginComponent } from './Component/login/login.component';
import { RentalAgreementAcceptanceComponent } from './Component/rental-agreement-acceptance/rental-agreement-acceptance.component';
import { EditRentalAgreementComponent } from './Component/edit-rental-agreement/edit-rental-agreement.component';
import { RentalAgreementPageComponent } from './Component/rental-agreement-page/rental-agreement-page.component';
import { HomePageComponent } from './Component/home-page/home-page.component';



const routes: Routes = [


  {
    component:HomePageComponent,
    path: '',
    pathMatch: 'full'
      },


  {
    component: CarListComponent,
    path: 'Cars'
  },

  {
    component: AddCarDetailComponent,
    path: 'AddCarDetail'
  },

  {
    component: UpdateCarDetailComponent,
    path: 'UpdateCarDetail/:vechicleId'
  },

  {
    component: CarRentPageComponent,
    path: 'RentYourCar'
  },

  {
    component: RentalAgreementAcceptanceComponent,
    path: 'AcceptRentalAgreement'
  },

  {
    component:RentalAgreementPageComponent,
    path:"RentalAgreementPage"
      },
    
   
      

  {
    component: UserRegisterComponent,
    path: 'Signup'
  },

  {
    component: LoginComponent,
    path: 'Login'
  },

  {
component:EditRentalAgreementComponent,
path:"editRentalAgreement"
  }

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
