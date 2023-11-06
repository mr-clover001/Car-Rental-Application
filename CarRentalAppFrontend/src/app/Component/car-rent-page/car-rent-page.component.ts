import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarListService } from '../Services/car-list.service';
import { AuthService } from '../Services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface RentalAgreementDetail{

  personName: string;
  vechicleId: number;
  mobile:number;
  adhar:number;
  email:string;
  duration:number;
  totalCost:number;

}

@Component({
  selector: 'app-car-rent-page',
  templateUrl: './car-rent-page.component.html',
  styleUrls: ['./car-rent-page.component.css']
})
export class CarRentPageComponent {

  isCarAdded: boolean = false;
  isUser: boolean = false;
  isAccess: boolean = false;
  isAdmin: any;
  carDetail: any = {};
  rentalDetails:any = {};
  menuType: string = 'Default';
  firstName: string = "";
  email: string = "";
  

  constructor(
    private services: CarListService,
     private router: ActivatedRoute,
     private authService:AuthService,
     private route:Router) { }

  ngOnInit() {
    this.getUserDetails();
    this.isAdmin = this.authService.isAdmin();
    this.isUser = this.authService.isUser();
    this.refreshCarDetail();
    
  }

  rentalDetailForm = new FormGroup({
    duration: new FormControl("", [
      Validators.required,
    ]),
    mobile: new FormControl("", [
      Validators.required,
    ]),
    adhar: new FormControl("", [
      Validators.required,
    ]),

  });

  get Duration(): FormControl {
    return this.rentalDetailForm.get("duration") as FormControl;
  }

  get Mobile(): FormControl {
    return this.rentalDetailForm.get("mobile") as FormControl;
  }

  get Adhar(): FormControl {
    return this.rentalDetailForm.get("adhar") as FormControl;
  }



  RentYourCar() {

    if(this.isUser){
      const mobileValue = Number(this.rentalDetailForm.value.mobile);
      const adharValue = Number(this.rentalDetailForm.value.adhar);
      const durationValue = Number(this.rentalDetailForm.value.duration);

      if(!isNaN(mobileValue)){
        const rentalAgreementDetail: RentalAgreementDetail ={

          personName: this.firstName,
          vechicleId: Number(this.carDetail.vechicleId),
          mobile: mobileValue,
          adhar: adharValue,
          email:this.email,
          duration:durationValue,
          totalCost: durationValue * Number(this.carDetail.rentalPrice),
  
        };
        console.log(rentalAgreementDetail);
       
        this.collectData(rentalAgreementDetail);
      }
   
    }
   
  }

collectData(data:any){
  
 this.route.navigate(['AcceptRentalAgreement'], { queryParams: data });

}

  refreshCarDetail() {
    this.router.queryParams.subscribe(params => {
      // console.log(params);
      this.carDetail = params;
    });
  }


  getUserDetails() {
    var user = localStorage.getItem("localUserData");
    if (user != null) {
      var userInfo = JSON.parse(user);
      this.firstName = userInfo.firstname;
      this.email = userInfo.email;
      this.menuType = userInfo.menuType;
      console.log(userInfo);
    } else {
      this.isUser = false;

    }
  }


  closeAlert() {
    this.isCarAdded = false;
  }

}
